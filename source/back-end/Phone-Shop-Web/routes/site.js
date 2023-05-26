const express = require('express');
const passport = require('../util/passport')
const router = express.Router()

const site_controller = require('../controllers/siteController')

router.use('/', function (req, res, next) {
  req.app.locals.layout = 'main'; // set your layout here
  next(); // pass control to the next handler
  });

router.post('/profile', site_controller.uppro)
router.get('/profile', site_controller.pro)

router.get('/login', site_controller.login)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/register', site_controller.register)
router.post('/register', site_controller.authen_new)

router.use('/', site_controller.show)

module.exports = router