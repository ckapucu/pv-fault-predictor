var connection = require('../connection');

function Strarr() {

  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from strarr_data', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };   

  this.create = function(strarr, res) {
    connection.acquire(function(err, con) {
      con.query('insert into strarr_data set ?', strarr, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'String data creation failed'});
        } else {
          res.send({status: 0, message: 'String data created successfully'});
        }
      });
    });
  };
}

module.exports = new Strarr();