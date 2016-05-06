var HomeController = require('./../controllers/HomeController');
var TimeClockController = require('./../controllers/TimeClockController');

// Routes
module.exports = function(app){
    
    // Main Routes
    
    app.get('/', TimeClockController.Index);   
    app.get('/log/:passKey', TimeClockController.Log);

}