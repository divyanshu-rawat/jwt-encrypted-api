
const express = require('express');


const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const User = require('./models/users');
const config = require('./config');
const jwt = require('jsonwebtoken');
const router = express.Router();
const port = process.env.PORT || 4000;
const user = require('./routes/user');
const greeting = require('./routes/greeting');

const cors = require('cors');
const food_jokes = require('./routes/food_jokes_route');
const celebrity_jokes = require('./routes/celebrity_jokes_route');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// using morgan to log requests to the console
app.use(morgan('dev'));


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://glacial-river-90152.herokuapp.com/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cors());

app.use('/api', greeting);
app.use('/api/user', user);

app.use('/api/jokes', food_jokes);



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
});

app.use('/api/jokes', celebrity_jokes);



mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

    console.log("CORS-enabled web server correctly connected!");

});


app.listen(port,()=> {
	console.log('Server Started');
})