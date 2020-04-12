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

app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).send('User created!'); 
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/users/:id', async (req,res) => {
    try {
        const _id = req.params.id;
        const user = await User.find({_id: _id});

        if (!user || user.length == 0) {
            res.status(404).send();
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.patch('/users/:id', async (req, res) => {
    const availableUpdates = ['age','name','email','password'];
    const updates = Object.keys(req.body);

    const canBeUpdated = updates.every((field) => {
        return availableUpdates.includes(field);
    });

    if (!canBeUpdated) {
        return res.status(400).send('Invalid updates.');
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).send();
        }

        res.status(200).send('User updated!');
    } catch (err) {
        res.status(400).send(err);
    }
})

app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();

        res.status(201).send('Task created!');
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});

        res.send(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/tasks/:id', async (req,res) => {
    try {
        const _id = req.params.id;
        const task = await Task.find({_id:_id});

        if (!task || task.length == 0) {
            res.status(404);
            res.send();
        } else {
            res.send(task);
        }
    } catch (err) {
        res.status(500).send();
    }
});

app.patch('/tasks/:id', async (req,res) => {
    const availableUpdates = ['description','completed'];
    const updates = Object.keys(req.body);

    const canBeUpdated = updates.every((field) => {
        return availableUpdates.includes(field);
    });

    if (!canBeUpdated) {
        return res.status(400).send('Invalid updates.');
    } 

    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true});

        if (!updatedTask) {
            return res.status(404).send();
        }

        res.send('Task updated!')
    } catch (err) {
        res.status(400).send(err);
    }
});

app.listen(port, () => { 
    console.log('Server is up and rinnning on port: ' + port); 
});