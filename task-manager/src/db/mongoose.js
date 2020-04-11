const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://localhost:27017/task-manager', { useNewUrlParser: true, useCreateIndex: true });

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
            if (value.includes('password')) {
                throw new Error('The password cannot contain password.');
            }
        },
        trim: true
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

const user = new User({
    name: 'Yulian',
    age: 31,
    email: 'ASHIK@ashi.com    ',
    password: 'asddsa'
});

// const task = new Task({
//     description: 'This is my first task',
//     completed: false
// });

user.save().then(() => {
    console.log('User ' + user.name + ' stored in the database!')
})
.catch((err) => {
    console.log('Error', err);
});

// task.save().then(() => {
//     console.log('Task created!');
// })
// .catch((err) => {
//     console.log('Error', err);
// });