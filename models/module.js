var connection = require('../connection');

function Module() {

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

  this.create = function(module, res) {
    connection.acquire(function(err, con) {
      con.query('insert into module_data set ?', module, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Modul data creation failed'});
        } else {
          res.send({status: 0, message: 'Modul data created successfully'});
        }
      });
    });
  };

  this.update = function(module, res) {
    connection.acquire(function(err, con) {
      con.query('update module_data set ? where recordno = ?', [module, module.recordno], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'Modul data update failed'});
        } else {
          res.send({status: 0, message: 'Modul data updated successfully'});
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

module.exports = new Module();