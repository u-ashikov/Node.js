const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { 'useNewUrlParser': true }, (error, client) => {
   if (error) {
       console.log('Unable to connect to the database!');
   } else {
       console.log('Successfully connected!');
   }
});