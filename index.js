
const express = require('express');


const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const User = require('./models/users');
const config = require('./config');
const jwt = require('jsonwebtoken');
const router = express.Router();

const user = require('./routes/user');
const greeting = require('./routes/greeting');
const post = require('./routes/post');
const food_jokes = require('./routes/food_jokes_route');
const celebrity_jokes = require('./routes/celebrity_jokes_route');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// using morgan to log requests to the console
app.use(morgan('dev'));

app.use('/api', greeting);
app.use('/api/user', user);

app.use((req,res,next) => {
	
	const token = req.body.token || req.query.token || req.headers['access-token'];

	if(token){
		jwt.verify(token, config.secretKey, function(err, user) {
			if(err){
				res.json({err:err});
			}
			else{
				next();
			}
		});
	}
	else {
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	}
})

app.use('/api/jokes', food_jokes);
app.use('/api/jokes', celebrity_jokes);

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    console.log("Connected correctly to server");

});


app.listen(4000,()=> {
	console.log('Server Started');
})