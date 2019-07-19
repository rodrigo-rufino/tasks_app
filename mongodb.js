const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'tasks_app';

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.');
    }

    const db = client.db(databaseName);

    db.collection('users').insertOne({
        name: 'Rodrigo',
        age: '23'
    }, (error, result) => {
        if (error) {
            return console.log('Unable to insert user.');
        }

        console.log(result.ops);
    });

    db.collection('users').insertMany([
        {
            name: 'Spike',
            age: '29'
        }, {
            name: 'Faye',
            age: '198'
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert user.');
        }

        console.log(result.ops);
    });
});