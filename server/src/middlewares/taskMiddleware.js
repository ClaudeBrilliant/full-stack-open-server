const { Task } = require('../../mongo.js');

// Middleware to find a task by ID
const findTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    req.task = task;
    next();
  } catch (err) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
};

module.exports = { findTaskById };