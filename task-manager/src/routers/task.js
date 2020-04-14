const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        });

        await task.save();

        res.status(201).send('Task created!');
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/tasks', auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate();

        const tasks = req.user.tasks;
        res.send(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/tasks/:id', auth, async (req,res) => {
    try {
        const task = await Task.findOne({_id:req.params.id, owner: req.user._id });

        if (!task || task.length == 0) {
            res.status(404).send();
        } else {
            res.send(task);
        }
    } catch (err) {
        res.status(500).send();
    }
});

router.patch('/tasks/:id', auth, async (req,res) => {
    const availableUpdates = ['description','completed'];
    const updates = Object.keys(req.body);

    const canBeUpdated = updates.every((field) => {
        return availableUpdates.includes(field);
    });

    if (!canBeUpdated) {
        return res.status(400).send('Invalid updates.');
    } 

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});

        if (!task) {
            return res.status(404).send();
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        res.send('Task updated!')
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});

        if (!task) {
            return res.status(404).send();
        }

        res.send('Task deleted!');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;