var db = require('./../config/db');
exports.Index = function(req, res){
    res.pageInfo = {};
    res.render('timeclock/Index', { 
    	alertAnimate: req.flash('alertAnimate'), 
    	successAnimate: req.flash('successAnimate'),
    	alertSuccess: req.flash('alertSuccess'),
    	alertFailue: req.flash('alertFailue') 
    });
};
exports.Log = function (req, res, done){
	db.clockEmployee(req,res,done);
}