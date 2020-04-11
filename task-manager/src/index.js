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

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    })
    .catch((err) => {
        res.status(400);
        res.send(err);
    })
});

app.get('/users/:id', (req,res) => {
    const _id = req.params.id;

    User.find({_id: _id}).then((user) => {
        console.log(user);
        if (!user || user.length == 0) {
            res.status(404);
            res.send();
        } else {
            res.send(user);
        }
    })
    .catch((err) => {
        res.status(500);
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
        res.status(500);
        res.send(err);
    });
});

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    })
    .catch((err) => {
        res.status(500);
        res.send(err);
    })
});

app.get('/tasks/:id', (req,res) => {
    const _id = req.params.id;

    Task.find({_id: _id}).then((task) => {
        if (!task || task.length == 0) {
            res.status(404);
            res.send();
        } else {
            res.send(task);
        }
    })
    .catch((err) => {
        res.status(500);
        res.send();
    })
});

app.listen(port, () => { 
    console.log('Server is up and rinnning on port: ' + port); 
});