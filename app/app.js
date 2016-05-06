'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var handlebars  = require('express-handlebars'), hbs;
var app = express();

app.set('port', 2);
app.set('views', path.join(__dirname, 'views'));

/* express-handlebars - https://github.com/ericf/express-handlebars
A Handlebars view engine for Express. */
hbs = handlebars.create({
   defaultLayout: 'main',
   layoutsDir: 'app/views/layouts/'
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// parse request bodies (req.body)
app.use(bodyParser.urlencoded({ extended: true }));


// send app to router
require('./config/router')(app);

require('./config/static')(app, express, path);


app.use(function(err, req, res, next){
  // log it
  if (!module.parent) console.error(err.stack);

  // error page
  res.status(500).render('5xx');
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

