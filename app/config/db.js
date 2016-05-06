var mysql      = require('mysql');
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
exports.example = function() {
	connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
	  if (err) throw err;

	  console.log('The solution is: ', rows[0].solution);
	});
}

exports.checkIfUserExists = function(passcode) {
	var isAlive = 0;
	var sql = "SET @pass_code = " + passcode + "; SELECT CheckIfExists(@pass_code) as CheckIfExists;"
	query = connection.query(sql, function(err, result) {
		if (err) throw err;
		//console.log(result);
		return result;
	});
}
exports.test = function(passcode) {

}
exports.checkIfUserIsLoggedIn = function() {

}
exports.clock = function(passcode) {
	var checkUser = this.checkIfUserExists(passcode);
	console.log(checkUser);
	if (checkUser == 1) {
		console.log("Clock IN");
	}
}
exports.clockIn = function(employee_id, time) {
	connection.query('INSERT INTO timeentries(employee_id,ClockIn) VALUES(' + employee_id + ',NOW())', function(err, rows, fields) {
		if (err) throw err;
		if (rows.length > 0) {
	  		console.log('user exists: ', rows);
	  		return true
	  	}
	  	else {
			console.log("Failure: No user exists");
			return false
		}
	});	
}
exports.clockOut = function(passcode) {

}
exports.clockOutIfForgot = function(passcode) {

}
exports.e = function() {

}