var connection = require('../connection');

function Battery() {

  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from battery_data', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };   

  this.create = function(battery, res) {
    connection.acquire(function(err, con) {
      con.query('insert into battery_data set ?', battery, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Battery data creation failed'});
        } else {
          res.send({status: 0, message: 'Battery data created successfully'});
        }
      });
    });
  };
}

module.exports = new Battery();