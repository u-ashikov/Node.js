const mongoose = require('mongoose');

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

module.exports = Task;