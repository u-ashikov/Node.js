const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { 'useNewUrlParser': true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to the database!');
    }

    const db = client.db(databaseName);

    //insertUser(db);
    //insertUsers(db);
    //insertTasks(db);
});

function insertUser(db) {
    db.collection('users').insertOne({
        name: 'Gosho',
        age: 17
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert document!');
        }

        console.log(result.ops);
    });
}

function insertUsers(db) {
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
    });
}

function insertTasks(db) {
    db.collection('tasks').insertMany([
        {
            description: 'My First Task',
            completed: true
        },
        {
            description: 'Clean the kitchen',
            completed: false
        },
        {
            description: 'Make dinner',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents!');
        }

        console.log(result.ops);
    });
};