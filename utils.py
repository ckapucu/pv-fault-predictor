import base64
from io import BytesIO



def plotPrediction(pred):
	"""
    Plots the prediction than encodes it to base64
    :param pred: prediction accuracies
    :return: base64 encoded image as string
    """
    labels = ["Case 0", "Case 1", "Case 2", "Case 3"]
    sns.set_context(rc={"figure.figsize": (5, 5)})
    with sns.color_palette("RdBu_r", 5):
        ax = sns.barplot(x=labels, y=pred)
    ax.set(ylim=(0, 1))

    # Base64 encode the plot
    stringIObytes = BytesIO()
    sns.plt.savefig(stringIObytes, format='jpg')
    sns.plt.show()
    stringIObytes.seek(0) # rewind to beginning of file
    base64data = base64.b64encode(stringIObytes.read())
    return base64data