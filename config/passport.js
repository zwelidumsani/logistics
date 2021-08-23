var passport = require('passport');
var User  = require('../models/user');
var localStrategy = require('passport-local').Strategy;
const { check, validationResult} = require('express-validator');


passport.serializeUser(function(user, done){
	 done(null,user.id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err,user);
	});
});


passport.use('strategy', new localStrategy({
	passReqToCallback: true
},function(req, username, password, done){
	
	 if (req.user){
		return done(null, false, {message:'You are still logged in'});
	}
	
	if(req.body.password != req.body.passwordTwo){
		return done(null, false, {message:'Passwords do not Match'});
	}
	
	if(req.body.password.length < 5){
		 return done(null, false, {message:'Password is too short; Should be 5 characters or greater.'});
	}
	
	User.findOne({email: username}, function(err, user){
		
		if(err){
			return done(err);
		}
		if(user){
			return done(null, false, {message:'Email is already in use.'});
		}
		
		var newUser = new User();
		newUser.email = username;
		newUser.password = newUser.encryptPassword(password);
		newUser.save(function(err, result){
			if (err){
				return done(err);
			}
			return done(null, newUser);
		});
	});
}));


passport.use('local', new localStrategy({
	passReqToCallback: true
},function(req, username, password, done){
	 
	
	User.findOne({email: username}, function(err, user){

		if(err){
			return done(err);
		}
		if(!user){
			return done(null, false, {message:'No user found.'});
		}
		if(!user.validPassword(password)){
			 console.log(req.session.counter++);
			
			    if(req.session.counter == 4){ 
					 console.log('Last Attempt.If you fail, Try after 00:20 Minutes');
		             return done(null, false);
	            }
			 return done(null, false,{message: 'Wrong password.'});
		}
	
	    return done(null, user);
		});	    
}));



