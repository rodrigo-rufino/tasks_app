const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
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
                throw new Error('Weak password! Contains the word "password".');
            }
        }
    }
});

// here, function is used to be able to use _this_
userSchema.pre('save', async function (next) {
    const user = this;

    console.log('AOOHOHO');

    next();
});

const User = mongoose.model('User', userSchema);


module.exports = User;