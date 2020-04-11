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
            if (value.toLowerCase().includes('password')) {
                throw new Error('The password cannot contain password.');
            }
        },
        trim: true
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: [true, 'The description is required.']
    },
    completed: {
        type: Boolean,
        default: false
    }
});

// const user = new User({
//     name: 'Yulian',
//     age: 31,
//     email: 'ASHIK@ashi.com    ',
//     password: 'asddsa'
// });

// user.save().then(() => {
//     console.log('User ' + user.name + ' stored in the database!')
// })
// .catch((err) => {
//     console.log('Error', err);
// });

const task = new Task({
    description: 'Learning some new stuff'
    // completed: false
});

task.save().then(() => {
    console.log('Task created!');
})
.catch((err) => {
    console.log('Error', err);
});