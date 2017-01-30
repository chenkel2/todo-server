class TodoHandler {
  getTodos: (req, res) => {
    var cursor =  db.collection('todos').find().toArray(function(err, results) {
      res.status(200);
      res.json(results);
    });
  },
  getTodo: (req, res) => {
    var cursor =  db.collection('todos').findOne({_id: ObjectId(req.params.todoId)}, function(err, result) {
      console.log('id is ' + req.params.todoId);
      res.status(200);
      res.json(result);
    });
  },
  createTodo: (req, res) => {
    db.collection('todos').save(req.body, (err, result) => {
      if (err) return console.log(err);
      res.status(201);
      res.send(req.body);
    });
  },
  updateTodo: (req, res) => {
    db.collection('todos')
    .findOneAndUpdate({
      _id: ObjectId(req.params.todoId)
    }, {
      $set: {
        name: req.body.name,
        todo: req.body.todo
      }
    },
    {},
    (err, result) => {
      db.collection('todos').findOne({_id: ObjectId(req.params.todoId)}, function(err, result) {
        console.log('id is ' + req.params.todoId);
        res.status(200);
        res.json(result);
      });
    });
  }
};

exports = TodoHandler;
