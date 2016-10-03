var connection = require('../connection');

function Data() {

  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from panel_data', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.get = function(recordno, res) {
    connection.acquire(function(err, con) {
      con.query('select * from panel_data where recordno = ?', [recordno], function(err, result) {
        con.release();
        /*if (err) {
          res.send({status: 1, message: 'Failed to select'});
        } else {
          res.send({status: 0, message: 'Selected successfully'});*/
        res.send(result);
      });
    });
  };

  this.get = function(panel_id, res) {
    connection.acquire(function(err, con) {
      con.query('select * from panel_data where panel_id = ?', [panel_id], function(err, result) {
        con.release();
        /*if (err) {
          res.send({status: 1, message: 'Failed to select'});
        } else {
          res.send({status: 0, message: 'Selected successfully'});*/
        res.send(result);
      });
    });
  };    

  this.create = function(data, res) {
    connection.acquire(function(err, con) {
      con.query('insert into panel_data set ?', data, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Panel data creation failed'});
        } else {
          res.send({status: 0, message: 'Panel data created successfully'});
        }
      });
    });
  };

  this.update = function(data, res) {
    connection.acquire(function(err, con) {
      con.query('update panel_data set ? where recordno = ?', [data, data.recordno], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Panel data update failed'});
        } else {
          res.send({status: 0, message: 'Panel data updated successfully'});
        }
      });
    });
  };

  this.delete = function(recordno, res) {
    connection.acquire(function(err, con) {
      con.query('delete from panel_data where recordno = ?', [recordno], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Failed to delete'});
        } else {
          res.send({status: 0, message: 'Deleted successfully'});
        }
      });
    });
  };
}

module.exports = new Data();