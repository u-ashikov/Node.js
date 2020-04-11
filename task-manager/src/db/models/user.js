const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: [true, 'User name is required.'],
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('The age must be a positive number.');
            }
        }
    },
    email: {
        type: String,
        required: [true, 'The email is required.'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('The email is not valid.');
            }
        },
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        minlength: [6, "The password length must be greater or equal to 6."],
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('The password cannot contain password.');
            }
        },
        trim: true
    }
});

module.exports = User;