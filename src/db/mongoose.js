const mongoose = require('mongoose');
const validator = require('validator');

const connectionURL = 'mongodb://127.0.0.1:27017/';
const databaseName = 'tasks_app_api';

mongoose.connect(connectionURL + databaseName, {
    useNewUrlParser: true,
    useCreateIndex: true
});