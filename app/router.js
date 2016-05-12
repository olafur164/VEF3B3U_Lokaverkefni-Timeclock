var HomeController = require('./controllers/HomeController');

// Routes
module.exports = function(app){
    
    // Main Routes
    
    app.get('/', HomeController.Index);
    app.get('/other', HomeController.Other);    
    
	// Route that creates a flash message using the express-flash module
	app.all('/express-flash', function( req, res ) {
	    req.flash('success', 'This is a flash message using the express-flash module.');
	    res.redirect(301, '/');
	});

	// Route that creates a flash message using custom middleware
	app.all('/session-flash', function( req, res ) {
	    req.session.sessionFlash = {
	        type: 'success',
	        message: 'This is a flash message using custom middleware and express-session.'
	    }
	    res.redirect(301, '/');
	});


};
