var connection = require('../connection');

function Dize() {

  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from module_data', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.get = function(recordno, res) {
    connection.acquire(function(err, con) {
      con.query('select * from module_data where recordno = ?', [recordno], function(err, result) {
        con.release();
        /*if (err) {
          res.send({status: 1, message: 'Failed to select'});
        } else {
          res.send({status: 0, message: 'Selected successfully'});*/
        res.send(result);
      });
    });
  };

  this.get = function(module_id, res) {
    connection.acquire(function(err, con) {
      con.query('select * from module_data where module_id = ?', [module_id], function(err, result) {
        con.release();
        /*if (err) {
          res.send({status: 1, message: 'Failed to select'});
        } else {
          res.send({status: 0, message: 'Selected successfully'});*/
        res.send(result);
      });
    });
  };    

  this.create = function(dize, res) {
    connection.acquire(function(err, con) {
      con.query('insert into module_data set ?', dize, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'String data creation failed'});
        } else {
          res.send({status: 0, message: 'String data created successfully'});
        }
      });
    });
  };

  this.update = function(dize, res) {
    connection.acquire(function(err, con) {
      con.query('update module_data set ? where recordno = ?', [dize, dize.recordno], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'String data update failed'});
        } else {
          res.send({status: 0, message: 'String data updated successfully'});
        }
      });
    });
  };

  this.delete = function(recordno, res) {
    connection.acquire(function(err, con) {
      con.query('delete from module_data where recordno = ?', [recordno], function(err, result) {
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

dize.exports = new Dize();