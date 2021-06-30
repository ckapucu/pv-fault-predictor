
from flask import Flask, request, jsonify, render_template
# Flask: to create a Flask app
# request: to get incoming request
# jsonify: to retıurn JSON output
# render_template: to render HTML page
import numpy as np
import pandas as pd
# to deserializaiton as Pickle
from sklearn.externals import joblib 
from flask_compress import Compress
import time
from math import exp, log
#from utils import plotPrediction

import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# create the app
app = Flask(__name__) 
Compress(app)

# load the pre-trained model 
clr = joblib.load("savedModel/my_model.pkl") #Ensemble
#clr = joblib.load("savedModel/enc_model.pkl") #Ensemble
#clr = joblib.load("savedModel/etc_model.pkl") #Extra Trees
#clr = joblib.load("savedModel/gbc_model.pkl") #Gradient Boosting
#clr = joblib.load("savedModel/bgc_model.pkl") #BaggingClassifier


def inverse_mapping(f):
    return f.__class__(map(reversed, f.items()))


def send_email(predictionValue, predictionAccuracy, G, Tc, Tm, Istr, Vstr, Pstr): #, figdata_jpg
    # Create the plain-text and HTML version of your message
    sender_email = "sender_email@gmail.com"
    receiver_email = "receiver_email@gmail.com"
    password = "sender_email_password"

    message = MIMEMultipart("alternative")
    message["Subject"] = "pv-fault-predictor detected this!"
    message["From"] = sender_email
    message["To"] = receiver_email


    text = """\
    Hi,
    pv-fault-predictor detected this!
    """
    html = """\
    <html>
      <body>
        <p>CASE """+str(predictionValue)+""" detected with """+str(round(predictionAccuracy*100,2))+"""% probability:<br>
           Vstr= """+str(round(Vstr,2))+"""V,<br>
           Istr= """+str(round(Istr,2))+"""mA,<br>
           Pstr= """+str(round(Pstr,2))+"""mW<br>
           @ G= """+str(round(G,2))+"""W/m2, Tc= """+str(round(Tc,2))+"""℃, Tm= """+str(round(Tm,2))+"""℃ operating conditions...<br>
           
           <a href="https://pv-fault-predictor.herokuapp.com">Pv Fault Predicting With Ensemble Learning</a>
        </p>
      </body>
    </html>
    """
    #<img src="data:image/jpg;base64,"""+str(figdata_jpg)+""" width="314"><br>

    
    # Turn these into plain/html MIMEText objects
    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    # Add HTML/plain-text parts to MIMEMultipart message
    # The email client will try to render the last part first
    message.attach(part1)
    message.attach(part2)

    # Create secure connection with server and send email
    context = ssl.create_default_context()
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(sender_email, password)
            server.sendmail(
                sender_email, receiver_email, message.as_string()
            )
            server.quit()
    except Exception as e:
        print(e)   

@app.route('/predict/<data>')
def predict(data):
    # Prepare data
    data_list = data.split('-')
   
    # check the size of the incoming data
    if len(data_list) != 5: 
        return jsonify(error="not enough data")

    # lets define the loaded model as a global variable to prevent loading in every request
    global clr
    
    rawData = np.array([(eval(data_list[0]), eval(data_list[1]), eval(data_list[2]), eval(data_list[3]), eval(data_list[4]))], dtype=float)

	# start timer
    s = time.clock() 

    G = rawData[0][3]
    T = rawData[0][4]   
    Tm = T 
    Tc = round((Tm + ((G/1000)*3)),2)
    
    Vstr = rawData[0][0]
    Istr = rawData[0][1] 
    Pstr = rawData[0][2] 

	# 19824 is theoritical power (mW) of the experimental PV system
    Prel = Pstr/19824

    inputData = np.array([Vstr, Istr, Pstr, G, Tc, Prel], dtype=float)   


	# to prevent predict_proba's raising a warning alert
    inputData = inputData.reshape(1, -1) 

   
   # Predict probability for classes
    rawPrediction = clr.predict_proba(inputData)[0]
    predictionIndex = np.argmax(rawPrediction, axis=0)
    predictionAccuracy = rawPrediction[predictionIndex]
    predictionValue = predictionIndex


	# stop timer
    e = time.clock() 
    predictionTime = e - s

    # send e-mail if predicted
    if predictionValue>0:
        send_email(predictionValue, predictionAccuracy, G, Tc, Tm, Istr, Vstr, Pstr)

    #base64BarChartImage = plotPrediction(rawPrediction)
    #return jsonify(prediction_index=predictionIndex, prediction_value=predictionValue, run_time=predictionTime,
    #               accuracy=str(predictionAccuracy), prediction_bar_chart=base64BarChartImage) #, prediction_bar_chart=base64BarChartImage olayini RANK'da degil Case bulurken kullanabiliriz belki

    return jsonify(predicted_case=str(predictionValue), run_time=predictionTime,
                   prediction_probability=str(predictionAccuracy), Istr=Istr, Pstr=Pstr, G=G, Tc=Tc, Tm=Tm, Vstr=Vstr,
                   case0_probability=rawPrediction[0], case1_probability=rawPrediction[1], case2_probability=rawPrediction[2], case3_probability=rawPrediction[3]#, case4_acc=rawPrediction[4]
                   ) #, prediction_bar_chart=base64BarChartImage 


@app.route('/', methods=['GET', 'POST'])
def home():
    

	# render home page 
    return render_template("home_template.html")


if __name__ == "__main__":
    app.run()
