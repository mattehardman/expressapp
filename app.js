//Module Dependencies
var express = require('express');
var morgan = require('morgan');
var methodOverride = require('method-override');
//var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var nib = require('nib');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/expressapp');


//Set port number
var PORTNUM = 3000;

//Initialise Express
var app = express();
console.log('Express initialised');

function compile(str,path){
	return stylus(str)
	.set('filename',path)
	.use(nib())
};

//Set views folder
app.set('views',__dirname+'/views');

//Initialise Jade
app.set('view engine','jade');
console.log('Jade initialised');

//middleware
app.use(morgan('dev'));
app.use(methodOverride());
//app.use(cookieParser('mykey'));
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: true }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(stylus.middleware(
  {
    src:__dirname + '/public',
    compile: compile
  }
));

app.use(express.static(__dirname+'/public'));


app.get('/',routes.index);
app.get('/userlist',routes.userlist(db));
app.post('/adduser',routes.adduser(db));

//Rendex index page
app.get('/', function(req,res){
	res.render('index',
	{
		title: 'Welcome to my humble abode'
	}
	);

});

app.listen(PORTNUM);
console.log('Server is now running on localhost:'+PORTNUM);
