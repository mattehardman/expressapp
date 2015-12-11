//Module Dependencies
var express = require('express');
var morgan = require('morgan');
var stylus = require('stylus');
var nib = require('nib');

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

//Stylus middleware
app.use(morgan('dev'));
app.use(stylus.middleware(
  {
    src:__dirname + '/public',
    compile: compile
  }
));

app.use(express.static(__dirname+'/public'));

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
