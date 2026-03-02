const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const db = require('../simple-task-manager/simple-task-manger/db.json');
let tasks = db.tasks;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

//requeting one task
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
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
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

//deleting a task
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

const unKnownEndpoint = (req, res) => {
  res.status(404).json({ error: 'Unknown endpoint' });
};

app.use(unKnownEndpoint);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});