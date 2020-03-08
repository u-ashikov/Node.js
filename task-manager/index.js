const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { 'useNewUrlParser': true }, (error, client) => {
   if (error) {
       console.log('Unable to connect to the database!');
   }

   const db = client.db(databaseName);

   db.collection('users').insertOne({
       name: 'Gosho',
       age: 17
   }, (error, result) => {
       if (error) {
           return console.log('Unable to insert document!');
       }

       console.log(result.ops);
   });

   db.collection('users').insertMany([
       {
        name: 'Stavri',
        age: 19 
       },
       {
        name: 'Mincho',
        age: 21 
       }
   ], (error, result) => {
       if (error) {
           return console.log('Unable to insert documents!');
       }

       console.log(result.ops);
   })
});