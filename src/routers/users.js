const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken(); 
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);        
    }

    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((error) => {
    //     res.status(400).send(error);
    // });
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (error) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            // remove section token from database
            return token.token !== req.token
        });

        await req.user.save();
        
        res.send();
    } catch (error) {
        res.status(400).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];

        await req.user.save();
        
        res.send();
    } catch (error) {
        res.status(400).send();
    }
});

router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(201).send(users);
    } catch (error) {
        res.status(500).send();        
    }
});

router.get('/users/me', auth, async (req, res) => {
    try {
        res.status(201).send(req.user);
    } catch (error) {
        res.status(500).send();        
    }
});

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);
//         if (!user) return res.status(404).send('User not found');
//         res.send(user);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) return res.status(400).send({error: 'Invalid updates!'});

    try {        
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;