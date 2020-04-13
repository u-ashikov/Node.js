const express = require('express');
const User = require('../db/models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        const token = await user.createAuthToken();

        res.status(201).send({message: 'User created!', token}); 
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/users/me', auth, async (req, res) => {
    try {
        res.send(req.user);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/users/logout', auth, async (req,res) => {
   try {
       req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token;
       });

       await req.user.save();
       res.send();
   } catch (err) {
       res.status(500).send();
   } 
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        req.user.token = null;

        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send();
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

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.checkCredentials(req.body.email, req.body.password);
        const token = await user.createAuthToken();

        res.send({user, token});

    } catch (err) {
        res.status(400).send();
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