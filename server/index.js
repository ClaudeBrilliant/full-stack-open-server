const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const { findTaskById } = require('./src/middlewares/taskMiddleware');

const db = require('./db.json');let tasks = db.tasks;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

//requesting one task
app.get('/tasks/:id', findTaskById, (req, res) => {
  res.json(req.task);
});

//creating a new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

//updating a task
app.put('/tasks/:id', findTaskById, (req, res) => {
  tasks[req.taskIndex] = { ...tasks[req.taskIndex], ...req.body };
  res.json(tasks[req.taskIndex]);
});

//deleting a task
app.delete('/tasks/:id', findTaskById, (req, res) => {
  tasks.splice(req.taskIndex, 1);
  res.status(204).send();
});

const unKnownEndpoint = (req, res) => {
  res.status(404).json({ error: 'Unknown endpoint' });
};

app.use(unKnownEndpoint);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});