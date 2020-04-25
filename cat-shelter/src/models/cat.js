const mongoose = require('../data/mongoose');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    breed: {
        type: 'ObjectId',
        ref: 'Breed',
        required: true
    }
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;