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

const user = new User({
    name: 'Yulian',
    age: 31
});

user.save().then(() => {
    console.log('User ' + user.name + ' stored in the database!')
})
.catch((err) => {
    console.log('Error', err);
});