var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var userRoutes = require('./routes/user');
var dbC = require('./config/config');
var app = express();

mongoose.connect(dbC.url, function (err) {
    if (!err) {
        console.log('!!mongodb connected!!');
    } else {
        console.log(err);
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname,'/public')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'asbasadadad', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('', function (req, res, next) {
    res.render('index');
});
require('./config/pass')(passport);


require('./routes/fb')(app, passport);
app.use(userRoutes);

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

app.listen(3000, function () {
    console.log('Listening on 3000');
})