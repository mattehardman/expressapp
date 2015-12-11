var express = require('express');

var app = express();


app.get('/',function(req,res){
  res.send('<h1>This is the homepage</h1>');
});

app.get('/about/:title',function(req,res){
  res.send('<h1> About '+req.params.title+'</h1>');
});


app.get('/about',function(req,res){
  res.send('<h1>About us</h1>');
});



console.log('Server started');
app.listen(3000);

