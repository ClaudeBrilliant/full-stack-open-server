require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url, { family: 4 })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error:', err.message));

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  completed: { type: Boolean, default: false },
});

// Transform the returned document to include 'id' instead of '_id'
taskSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = { Task };