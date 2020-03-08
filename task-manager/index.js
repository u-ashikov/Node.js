const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
const ObjectID = mongodb.ObjectId;

MongoClient.connect(connectionURL, { 'useNewUrlParser': true }, (error, client) => {
    if (error) {
        console.log('Unable to connect to the database!');
    }

    const db = client.db(databaseName);

    // CREATE
    //insertUser(db);
    //insertUsers(db);
    //insertTasks(db);

    // READ
    //findUserByName(db, 'Stavri');
    //findUsersByAge(db, 17);

    //findTaskById(db, '5e64effe4c45de2b18bd63e9');
    //findIncompletedTasks(db, false);

    // UPDATE
    //updateUserNameById(db, "5e64eb59d76a802b3060a188", 'Kiro');
    //updateUserAgeById(db, '5e64eeed48a6551df47a0baa', 5);
    //completeAllTasks(db);

    // DELETE
    //deleteUsersWithAge(db, 19);
    //deleteTaskByDescription(db, 'My First Task');
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

function findUserByName(db, name) {
    db.collection('users').findOne({ name }, (error, user) => {
        if (error) {
            return console.log('Unable to fetch data!');
        }

        if (!user) {
            return console.log('User not found!');
        }

        console.log(user);
    });
}

function findUsersByAge(db, age) {
    db.collection('users').find({ age }).toArray((error, users) => {
        if (error) {
            return console.log('Unable to fetch data!');
        }

        if (!users || users.length == 0) {
            return console.log('No users found!');
        }

        console.log(users);
    });
}

function findTaskById(db, id) {
    db.collection('tasks').findOne({_id : ObjectID(id)}, (error, task) => {
        if (error) {
            return console.log('Unable to fetch data!');
        }

        if (!task) {
            return console.log('Task not found!');
        }

        console.log(task);
    });
}

function findIncompletedTasks(db, isCompleted) {
    db.collection('tasks').find({ completed: isCompleted }).toArray((error, tasks) => {
        if (error) {
            return console.log('Unable to fetch data!');
        }

        if (!tasks || tasks.length == 0) {
            return console.log('No tasks found!');
        }

        console.log(tasks);
    });
}

function updateUserNameById(db, id, name) {
    db.collection('users').updateOne({_id: ObjectID(id)}, {
        $set: {
            name: name
        }
    })
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
}

function updateUserAgeById(db, id, amount) {
    db.collection('users').updateOne({_id: ObjectID(id)}, {
        $inc: {
            age: amount
        }
    })
    .then((result) => {
        console.log('Modified Count: ' + result.modifiedCount);
    })
    .catch((error) => {
        console.log(error);
    });
}

function completeAllTasks(db) {
    db.collection('tasks').updateMany({ completed: false}, {
        $set: {
            completed: true
        }
    })
    .then((result) => {
        console.log('Modified Count: ' + result.modifiedCount);
    })
    .catch((error) => {
        console.log(error);
    });
}

function deleteUsersWithAge(db, age) {
    db.collection('users').deleteMany({age})
    .then((result) => {
        console.log('Deleted count: ' + result.deletedCount);
    })
    .catch((error) => {
        console.log(error)
    });
}

function deleteTaskByDescription(db, description) {
    db.collection('tasks').deleteOne({ description })
    .then((result) => {
        console.log('Deleted count: ' + result.deletedCount);
    })
    .catch((error) => {
        console.log(error);
    });
}