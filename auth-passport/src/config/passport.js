const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  (username, password, cb) => {
    console.log({
      username,
      password
    });
    User.findByUsername(username, (err, user) => {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    })
    
  }
));

passport.serializeUser(function(user, done) {
  console.log('serializeUser')
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser')
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.ensureAuthenticated = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.send({msg: "please login"});
  }
};

module.exports = passport;



