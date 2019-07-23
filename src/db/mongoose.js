const mongoose = require('mongoose');

const connectionURL = 'mongodb://127.0.0.1:27017/';
const databaseName = 'tasks_app_api';

mongoose.connect(connectionURL + databaseName, {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

const task = new Task({
    description: 'Learn Mongoose',
    completed: false
});

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log(error);
});