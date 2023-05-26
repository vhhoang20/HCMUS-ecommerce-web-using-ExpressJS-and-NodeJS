const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars');
const app = express() 
const passport = require('./util/passport')
const session = require('express-session');
const route = require('./routes')
const db = require('./database')
const flash = require('connect-flash')

db.connect()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'keyboard cat',
    cookie: {  expires: false, }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
}); 

app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

route(app)

app.listen(3000)