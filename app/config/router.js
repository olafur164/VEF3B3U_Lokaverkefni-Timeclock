var db = require('./db');

var HomeController = require('./../controllers/HomeController');
var TimeClockController = require('./../controllers/TimeClockController');

// Routes
module.exports = function(app){
    
    // Main Routes
    
    app.get('/', TimeClockController.Index);   
    app.post('/', TimeClockController.Log)

}