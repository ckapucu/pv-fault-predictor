var connection = require('../connection');

function Dize() {

  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from string_data', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };   

  this.create = function(dize, res) {
    connection.acquire(function(err, con) {
      con.query('insert into string_data set ?', dize, function(err, result) {
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

module.exports = new Dize();