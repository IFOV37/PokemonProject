// main node file

// add in express middleware
var express = require('express');

// add in our mysql db connection
var mysql = require('./dbcon.js');

// add in body parser to help parser json
var bodyParser = require('body-parser');


// express app
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);

// setup new body object to be created of any type (e:t)
app.use(bodyParser.urlencoded({extended:true}));

// script for static pages
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');

// set the port to whatever [valid] number you want and set db stuff
app.set('port', 33445);
app.set('mysql', mysql);


app.use('/home', require('./home.js'));
app.use('/pokemon', require('./pokemon.js'));
app.use('/trainers', require('./trainers.js'));
app.use('/badges', require('./badges.js'));
app.use('/gyms', require('./gyms.js'));
app.use('/trainers-badges', require('./trainers-badges.js'));


app.use(function(req, res){
	res.status(404);
	res.render('404');
});

app.use(function(req, res){
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});