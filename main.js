// main node file

// add in express middleware
var express = require('express');

// add in our mysql db connection
var mysql = require('./dbcon.js');

// add in body parser to help parser json
var bodyParser = require('body-parser');


// express app
var app = express();

// Do we want handlebars?  if so, add it here.
// also add the engine here

// setup new body object to be created of any type (e:t)
app.use(bodyParser.urlencoded({extended:true}));

//we wouladd the add the static page stuff and set view engine here

// set the port to whatever [valid] number you want
app.set('port', 33445);


app.use('/', require('./file'));

/*  If we don't use handlebars, this doesn't do anything:
app.use(function(req, res){
	res.status(404);
	res.render('404');
});


app.use(function(req, res){
	res.status(500);
	res.render('500');
});

*/

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});