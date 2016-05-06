// Authenticate using our plain-object database of doom!

var User = {
  tj: { passcode: '222' }
};

function authenticate(passcode) {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        console.log(Worked)
        return done(null, user);
      });
    }
  ));
}