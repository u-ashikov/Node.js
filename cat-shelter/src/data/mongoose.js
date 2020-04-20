const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/cat-shelter';

mongoose.connect(connectionString, { useNewUrlParser: true }).then(
    () => console.log('Connected to the database.'),
    err => console.log('Error'. err)
);

module.exports = mongoose;