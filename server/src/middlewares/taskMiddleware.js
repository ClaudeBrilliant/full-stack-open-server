const db = require('../db.json');

let tasks = db.tasks;

// Middleware to find a task by ID
const findTaskById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  req.task = task;
  req.taskIndex = tasks.findIndex(t => t.id === id);
  next();
};

module.exports = {
  findTaskById
};