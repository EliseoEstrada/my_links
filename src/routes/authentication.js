const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLogged, isNotLogged} = require('../lib/helpers');


router.get('/signin', isNotLogged, (req, res) => {
    res.render('auth/signin')
})
router.get('/signup', isNotLogged, (req, res) => {
    res.render('auth/signup')
})


router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/links',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/links',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});



router.get('/profile', isLogged, (req, res) => {
    res.render('profile');
});

router.get('/logout', isLogged, (req, res) => {
    req.logout();
    res.redirect('/signin');
});

module.exports = router;