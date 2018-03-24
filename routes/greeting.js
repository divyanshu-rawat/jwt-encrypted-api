

var express = require('express');
var app = express.Router();

app.get('/', (req,res) => {
	res.send({
		message:'Welcome'
	})
})


module.exports = app;
