var connection = require('../connection');

function Room() {

  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from room_data', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };   

  this.create = function(room, res) {
    connection.acquire(function(err, con) {
      con.query('insert into room_data set ?', room, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Room data creation failed'});
        } else {
          res.send({status: 0, message: 'Room data created successfully'});
        }
      });
    });
  };
}

module.exports = new Room();