const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/';
const databaseName = 'tasks_app_api';

mongoose.connect(connectionURL + databaseName, {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid e-mail');
            }
        }
    },
    age: {
        type: Number,
        default: 1,
        validate(value) {
            if (value < 0){
                throw new Error('Age must be a positive number');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Weak password! Contains the word "password'.);
            }
        }
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
});




// const user = new User({
//     name: 'Rodrigo Rufino Ribeiro',
//     email: 'valid@email.com',
//     password: '123password4567'
// });
// user.save().then(() => {
//     console.log(user);
// }).catch((error) => {
//     console.log(error);
// });;

// const task = new Task({
//     description: 'Learn Mongoose',
//     completed: false
// });
// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log(error);
// });