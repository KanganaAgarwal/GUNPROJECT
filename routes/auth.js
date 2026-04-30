const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// register form
router.get('/register', (req, res) => {
    res.render('register');
});

// register user
router.post('/register', async (req, res) => {
    try {
        const { age, phoneNumber, gender, isLegal, password, username } = req.body;

        const user = new User({
            username,
            age,
            phoneNumber,
            gender,
            isLegal: isLegal === 'on'
        });

        const registeredUser = await User.register(user, password);

        res.redirect('/guns');
    } catch (e) {
        console.log(e);
        res.send("Error in registration");
    }
});

// login form
router.get('/login', (req, res) => {
    res.render('login');
});

// login
router.post('/login', 
    passport.authenticate('local', {
        failureRedirect: '/login'
    }),
    (req, res) => {
        res.redirect('/guns');
    }
);

// logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/login');
    });
});

module.exports = router;