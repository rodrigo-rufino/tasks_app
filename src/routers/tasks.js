const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body, //copy everything from body to this object
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if(!task) return res.status(404).send('Task not found');
        res.status(200).send(task);
    } catch (error) {
        res.status(500).send(error);
    }

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.send(task);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) return res.status(400).send({error: 'Invalid updates!'});

    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).send();

        updates.forEach((update) => task[update] = req.body[update]);

        res.send(task);

    } catch (error) {
        res.status(404).send(error);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        
        if (!task) return res.status(404).send(task);
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;