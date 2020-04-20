const mongoose = require('../data/mongoose');

const breedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Breed = mongoose.model('Breed', breedSchema);

module.exports = Breed;