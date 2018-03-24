
var express = require('express');
var app = express.Router();

app.post('/post',(req,res) => {

	res.json({
		reponse:'in progress'
	})
})


module.exports = app;