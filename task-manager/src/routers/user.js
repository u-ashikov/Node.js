const express = require('express');
const User = require('../db/models/user');

const router = new express.Router();

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).send('User created!'); 
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/users/:id', async (req,res) => {
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

router.patch('/users/:id', async (req, res) => {
    const availableUpdates = ['age','name','email','password'];
    const updates = Object.keys(req.body);

    const canBeUpdated = updates.every((field) => {
        return availableUpdates.includes(field);
    });

    if (!canBeUpdated) {
        return res.status(400).send('Invalid updates.');
    }

    try {
        const user = await User.findById(req.params.id);
        
        updates.forEach((update) => user[update] = req.body[update]);

        await user.save();

        if (!user) {
            return res.status(404).send();
        }

        res.status(200).send('User updated!');
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send();
        }

        res.send('User deleted!');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;