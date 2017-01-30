setup(app, handlers) {
  app.get('/todos', handlers.todo.getTodos);
  app.get('/todos/:todoId', handlers.todo.getTodo);
  app.post('/todos', handlers.todo.createTodo);
  app.put('/todos/:todoId', handlers.todo.updateTodo);
}

exports.setup = setup;
