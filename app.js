var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var session  = require('express-session')
var MongoStore  = require('connect-mongo')
var mongoClient = require('mongoose')
var flash = require('connect-flash')
var passport = require('passport')
var nodemailer = require('nodemailer')
var http = require('http')
require('./config/passport')
var csrf = require('csurf');

var csrfProtection = csrf()


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// Database connection
mongoClient.connect('mongodb+srv://sicelo:qwerty123456@cluster0.9piaa.mongodb.net/mongoDB?retryWrites=true&w=majority',{  
  useUnifiedTopology: true,
   useNewUrlParser: true
}).then(() =>{
	     console.log("DB-Connection successfull!");
	})
    .catch(err => {
		console.log("DB-Connection failed!");
	})	


var app = express();
app.disable('x-powered-by');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(cookieParser());


app.use(session({
  secret: 'zwelidumsanisicelodlaminisecretcookiecode',
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://sicelo:qwerty123456@cluster0.9piaa.mongodb.net/mongoDB?retryWrites=true&w=majority',
    touchAfter: 14*24*60*60*1000 // time period in seconds
  })
}))


 
app.use(flash());
//app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(passport.initialize());
app.use(passport.session());
app.use(csrfProtection);


app.use(function(req, res, next){
	res.locals.login = req.isAuthenticated();
	res.locals.session = req.session;
	next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
