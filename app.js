const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const ejsMate = require('ejs-mate');

const User = require('./models/User');
 
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/gunDB');

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);   // ✅ FIX

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', require('./routes/auth'));
app.use('/guns', require('./routes/guns'));

app.listen(3000, () => console.log("Server Started"));
