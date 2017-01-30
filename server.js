const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
var db;

MongoClient.connect('mongodb://chenkel:socks@ds117889.mlab.com:17889/chenkel-star-wars-quotes', (err, database) => {
  if (err) return console.log(err)

  db = database

  app.listen(8080, function() {
    console.log('listening on port 8080');
  });
});

app.use(cors());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.get('/todos', (req, res) => {
  db.collection('todos').find().toArray(function(err, results) {
    res.status(200);
    res.json(results);
  });
});

app.get('/todos/:todoId', (req, res) => {
  var cursor =  db.collection('todos').findOne({_id: ObjectId(req.params.todoId)}, function(err, result) {
    res.status(200);
    res.json(result);
  });
});

app.post('/todos', (req, res) => {
  console.log(req.body);
  db.collection('todos').save(req.body, (err, result) => {
    if (err) return console.log(err);
    res.status(201);
    res.send(req.body);
  });
});

app.put('/todos/:todoId', (req, res) => {
  console.log("description is " + req.body.description);
  db.collection('todos')
  .findOneAndUpdate({
    _id: ObjectId(req.params.todoId)
  }, {
    $set: {
      description: req.body.description,
      completed: req.body.completed
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
});

app.delete('/todos/:todoId', (req, res) => {
  db.collection('todos').findOneAndDelete({_id: ObjectId(req.params.todoId)},
  (err, result) => {
    if (err) return res.send(err)
    res.send(result.value)
  });
});
