var connection = require('../connection');

function Radiation() {

  //https://www.npmjs.com/package/node-restful BUNA BAKAK
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from radiation', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.get = function(recordno, res) {
    connection.acquire(function(err, con) {
      con.query('select * from radiation where recordno = ?', [recordno], function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  
  /*
  this.get = function(dyn_sql, res) {
    connection.acquire(function(err, con) {
      con.query('select * from users where ?', [dyn_sql], function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };
  /**/   

  this.create = function(radiation, res) {
    connection.acquire(function(err, con) {
      con.query('insert into radiation set ?', radiation, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'radiation creation failed'});
        } else {
          res.send({status: 0, message: 'radiation created successfully'});
        }
      });
    });
  };


}

module.exports = new Radiation();