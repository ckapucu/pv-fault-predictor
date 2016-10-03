var connection = require('../connection');

function Users() {

  //https://www.npmjs.com/package/node-restful BUNA BAKAK
  this.get = function(res) {
    connection.acquire(function(err, con) {
      con.query('select * from users', function(err, result) {
        con.release();
        res.send(result);
      });
    });
  };

  this.get = function(recordno, res) {
    connection.acquire(function(err, con) {
      con.query('select * from users where recordno = ?', [recordno], function(err, result) {
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

  this.create = function(users, res) {
    connection.acquire(function(err, con) {
      con.query('insert into users set ?', users, function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'users creation failed'});
        } else {
          res.send({status: 0, message: 'users created successfully'});
        }
      });
    });
  };

  this.update = function(users, res) {
    connection.acquire(function(err, con) {
      con.query('update users set ? where recordno = ?', [users, users.recordno], function(err, result) {
        con.release();
        if (err) {
          res.send({status: 1, message: 'users update failed'});
        } else {
          res.send({status: 0, message: 'users updated successfully'});
        }
      });
    });
  };

  this.delete = function(recordno, res) {
    connection.acquire(function(err, con) {
      con.query('delete from users where recordno = ?', [recordno], function(err, result) {
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

module.exports = new Users();