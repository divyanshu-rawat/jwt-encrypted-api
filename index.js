
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



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// using morgan to log requests to the console
app.use(morgan('dev'));

app.use('/', greeting);
app.use('/user', user);

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




app.use('/posts', post);

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    console.log("Connected correctly to server");

});






app.listen(4000,()=> {
	console.log('Server Started');
})