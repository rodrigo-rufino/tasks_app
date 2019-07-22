// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient, ObjectID} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'tasks_app';

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database.');
    }

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     name: 'Rodrigo',
    //     age: '23'
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user.');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Spike',
    //         age: '29'
    //     }, {
    //         name: 'Faye',
    //         age: '23'
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user.');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: "Clean the house",
    //         completed: true
    //     }, {
    //         description: "Renew inspection",
    //         completed: false
    //     }, {
    //         description: 'Pot plants',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) return console.log('Unable to insert tasks!');

    //     console.log(result.ops);
    // });




    // const id = new ObjectID();
    // console.log(id);
    // console.log(id.getTimestamp());

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Alca',
    //     age: '23'
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user.');
    //     }

    //     console.log(result.ops);
    // });




    db.collection('users').findOne({name: 'Spike'}, (error, user) => {
        if (error) return console.log('Unable to fetch');

        console.log('\n===findOne');
        console.log(user);
    });
    db.collection('users').findOne({_id: new ObjectID("5d321b66a7c4321c24902f86")}, (error, user) => {
        if (error) return console.log('Unable to fetch');

        console.log('\n===findOne(id)');
        console.log(user);
    });
    db.collection('users').find({ age: '23' }).toArray((error, users) => {
        if (error) return console.log('Unable to fetch');

        console.log('\n===find().toArray()');
        console.log(users);
    });


    db.collection('users').find({ age: '23' }).count((error, count) => {
        if (error) return console.log('Unable to fetch');

        console.log('\n===find().count()');
        console.log(count);
    });
});