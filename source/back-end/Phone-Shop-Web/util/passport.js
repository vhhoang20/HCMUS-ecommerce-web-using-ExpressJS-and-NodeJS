const { response } = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const user = require('../models/user')

passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const data = await user.find({account: username, password: password});
  if (data.length === 0)
  {
    return cb(null, false);
  }
  return cb(null, data);
}));

passport.serializeUser((username, done) => {
  done(null, username);
})

passport.deserializeUser((username, done) => {
  done(null, username);
});

module.exports = passport;