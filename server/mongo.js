require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('Connected to MongoDB');

    const taskSchema = new mongoose.Schema({
      title: String,
      completed: Boolean
    });

    const Task = mongoose.model('Task', taskSchema);

    const task = new Task({
      title: 'Sample Task',
      completed: false
    });

    return task.save();
  })
  .then(() => {
    console.log('Task saved to MongoDB');
    mongoose.connection.close();
  })
  .catch(err => console.error('Error:', err.message));