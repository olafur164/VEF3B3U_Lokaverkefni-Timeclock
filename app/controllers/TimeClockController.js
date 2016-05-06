var db = require('./../config/db');
db.clock(059);
exports.Index = function(req, res){
    res.pageInfo = {};
    res.pageInfo.title = '';
    res.pageInfo.input1 = '.';
    res.pageInfo.input2 = '.';
    res.pageInfo.input3 = '.';
    res.pageInfo.passed = '';
    res.render('timeclock/Index', res.pageInfo);
};
exports.Log = function(req, res){
    res.pageInfo = {};
    res.pageInfo.abc = true;
    res.pageInfo.input1 = req.params.passKey.charAt(0);
    res.pageInfo.input2 = req.params.passKey.charAt(1);
    res.pageInfo.input3 = req.params.passKey.charAt(2);
    var passcode = req.params.passKey;
    db.clock(passcode);
    var passed = true;
    if (passed) {
    	res.pageInfo.passed = '<script> passedAnimation() </script>';
    }
    else {
    	res.pageInfo.passed = '<script> wrongPasswd() </script>';
    }
    res.pageInfo.passed = '';
    res.render('timeclock/Index', res.pageInfo);

};
