var mysql      = require('mysql');
var moment = require('moment');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test',
  multipleStatements: true,
  stringifyObjects: true
});
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
    exports.clockEmployee = function(req,res,done) {
        var passcode = req.body.passcode;
    	connection.query("SELECT * FROM employees WHERE passcode = ?", passcode, function(err, rows) {
        	if (err)
                return done(err);
            if (rows.length) {
            	var social_id = rows[0].social_id;
            	// Check if user is logged in if not then clock him else clock out.
            	connection.query("SELECT * FROM timeentries where employee_id = ? and ClockOut IS NULL and logged_in = 1", social_id, function(err, rows) {

    		    	if (err)
    		            return done(err);
    		        if (rows.length) {
    		        	// Clock Out
    		        	var updateQuery = "UPDATE timeentries SET ClockOut = NOW(), logged_in = 0 WHERE employee_id = ? and logged_in = 1";
    		       		connection.query(updateQuery, social_id, function(err, rows) {
    		        		connection.query("SELECT * FROM employees WHERE social_id = ?", social_id, function(err, rows) {
                                req.flash('successAnimate', '<script>passedAnimation();</script>');
                                req.flash('alertSuccess', 'Takk fyrir vaktina ' + rows[0].name + ' - ' + moment(Date.now()).format('MM/DD/YYYY H:m:s'));
                                res.redirect(301, '/');
                            })
    		       		});
    		       	}
    		       	else {
    		       		// Clock In
    		        	var insertQuery = "INSERT INTO timeentries ( employee_id, ClockIn, ClockOut, logged_in ) values (?, NOW(), NULL, 1)";
    		        	connection.query(insertQuery, social_id, function(err, rows) {
                            connection.query("SELECT * FROM employees WHERE social_id = ?", social_id, function(err, rows) {
                                req.flash('successAnimate', '<script>passedAnimation();</script>');
                                req.flash('alertSuccess', 'Velkomin/nn á vakt ' + rows[0].name + ' - ' + moment(Date.now()).format('MM/DD/YYYY H:m:s'));
                                res.redirect(301, '/');
                            })
                      });
    		       	}
    		    });
            } else {
                // if there is no employee with that passcode
                // Return error message.
                console.log("Failure");
                req.flash('alertAnimate', '<script>wrongPasswd();</script>');
                res.redirect(301, '/');
            }
        });
    }