
const express = require('express');
const app = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

app.post('/register',(req,res)=>{
	
	bcrypt.hash(req.body.password, 10, function(err, hash) {

		if(err){
			return res.json({
				error:err
			});
		}
		else{

			User.find({email:req.body.email})
			.exec((err,result) =>{

				if(result.length >= 1){
					res.json({
						success:false,
						error:'User Already Exists'
					})
				}
				else{

					const user = new User({
						email:req.body.email,
						password: hash
					})

					user.save().then((err,user)=>{
						res.json({
							success:true
						})
					})
					.catch((err)=>{
						res.json({
							error:err
						})
					})
				}
			})
		}	
	});
})




module.exports = app;