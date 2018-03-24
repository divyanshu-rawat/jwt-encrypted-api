
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const User = require('./models/users');

const router = express.Router();

const user = require('./routes/user');
const greeting = require('./routes/greeting');

const config = require('./config');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// using morgan to log requests to the console
app.use(morgan('dev'));

app.use('/user', user);
app.use('/', greeting);

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    console.log("Connected correctly to server");

});






app.listen(4000,()=> {
	console.log('Server Started');
})