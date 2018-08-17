

var express = require('express');
var app = express.Router();

app.get('/', (req,res) => {
	res.send({
		Message:'Welcome Abroad :)'
	})
})


module.exports = app;
