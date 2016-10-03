var todo = require('./models/todo');
var users = require('./models/users');

module.exports = {
  configure: function(app) {
    //http verbs for todo_list model
    app.get('/todo/', function(req, res) {
      todo.get(res);
    });

    app.post('/todo/', function(req, res) {
      todo.create(req.body, res);
    });

    app.put('/todo/', function(req, res) {
      todo.update(req.body, res);
    });

    app.delete('/todo/:id/', function(req, res) {
      todo.delete(req.params.id, res);
    });



    //http verbs for users model
    app.get('/users/', function(req, res) {
      users.get(res);
    });

    app.get('/users/:recordno/', function(req, res) {
      users.get(req.params.recordno, res);
    });
    /*
    app.get('/users/:dyn_sql/', function(req, res) {
      users.get(req.params.dyn_sql, res);
    });

    /**/
    app.post('/users/', function(req, res) {
      users.create(req.body, res);
    });

    app.put('/users/', function(req, res) {
      users.update(req.body, res);
    });

    app.delete('/users/:recordno/', function(req, res) {
      users.delete(req.params.recordno, res);
    });

  }
};