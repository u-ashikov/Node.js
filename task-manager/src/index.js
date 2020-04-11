const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const User = require('./db/models/user');
const Task = require('./db/models/task');
require('./db/mongoose');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello stranger, this is Task Manager API!');
});

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201);
        res.send('User created!');
    })
    .catch((err) => {
        res.status(400);
        res.send(err);
    });
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201);
        res.send('Task created!');
    })
    .catch((err) => {
        res.status(400);
        res.send(err);
    });
});

app.listen(port, () => { 
    console.log('Server is up and rinnning on port: ' + port); 
});