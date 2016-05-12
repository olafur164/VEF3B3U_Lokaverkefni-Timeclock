var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var flash    = require('connect-flash');
var handlebars  = require('express-handlebars'), hbs;
var http = require('http');
var moment = require('moment');
var morgan = require('morgan');
var mysql      = require('mysql');
var path = require('path');
var session  = require('express-session');
var sessionStore = new session.MemoryStore;
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


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());
// Custom flash middleware -- from Ethan Brown's book, 'Web Development with Node & Express'
app.use(function(req, res, next){
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

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

module.exports = app;