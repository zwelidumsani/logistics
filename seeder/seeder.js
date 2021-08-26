var Prices = require('../models/prices');
var mongoose = require('mongoose');

//mongodb+srv://dumsani:aCCysqyflJmPlG29@cluster0.jruhp.mongodb.net/mongoDB?retryWrites=true&w=majority
//mongodb://localhost/shopping


try {
	const uri = 'mongodb+srv://sicelo:qwerty123456@cluster0.9piaa.mongodb.net/mongoDB?retryWrites=true&w=majority';	
	mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
	console.log("connected"));
	}catch (error) { 
	console.log("could not connect");    
	}
     
	 var prices = new Prices({
	 oneKg:100,
	 twoKg:200,
	 fourKg:300,
	 fiveKg:500	
    })



	prices.save(function(err, result){
	     if (err){
			 console.log(err)
		 } else {
			 
		 }		 
    });
 
	

function exit(){
	mongoose.disconnect();
}
