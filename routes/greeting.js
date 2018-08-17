

var express = require('express');
var app = express.Router();

app.get('/', (req,res) => {
	res.send({
		Message:'Welcome To Mock the Week :)'
	})
})


module.exports = app;
