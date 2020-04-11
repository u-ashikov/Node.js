const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/task-manager', { useNewUrlParser: true, useCreateIndex: true });

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

const user = new User({
    name: 'Yulian',
    age: 31
});

const task = new Task({
    description: 'This is my first task',
    completed: false
});

// user.save().then(() => {
//     console.log('User ' + user.name + ' stored in the database!')
// })
// .catch((err) => {
//     console.log('Error', err);
// });

task.save().then(() => {
    console.log('Task created!');
})
.catch((err) => {
    console.log('Error', err);
});