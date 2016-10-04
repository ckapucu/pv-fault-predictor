var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
//var stormpath = require('express-stormpath');
var md5 = require('md5');
var rest = require("./rest.js");
var app  = express();
var port = process.env.PORT || 5000;

function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        host     : 'petunia.arvixe.com',
        user     : 'ckapucu',
        password : 'M2667k9363',
        database : 'ck_deneme',
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection,md5);
      self.startServer();
}

REST.prototype.startServer = function() {

      //BEN EKLEDIM
      /*
      app.use(stormpath.init(app, {
          //apiKeyFile: '/.stormpath/apiKey.properties',
          apiKeyId:     process.env.STORMPATH_API_KEY_ID || '2MX20ON9RGIMPKFBAK5FKL1UJ',
          apiKeySecret: process.env.STORMPATH_API_KEY_SECRET || 'OfxQQrZKz1QjJHYlDj7qhPKAx+JQUTD2mWk4oyNZXdU',
          application:  process.env.STORMPATH_URL || 'https://api.stormpath.com/v1/applications/1SbZDyiJDSKabH9wtRC8hr'
      }));
      /**/

      //app.use(stormpath.init(app, { }));

      app.listen(port,function(){
          console.log("All right ! I am alive at Port " + port);
      });

      /*
      app.on('stormpath.ready', function() {
          app.listen(port,function(){
            console.log("All right ! I am alive at Port " + port);
          });
      });/**/
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();