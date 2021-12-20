const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const db = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const rows = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password)
        if(validPassword){
            done(null, user);
        }else{
            done(null, false, req.flash('message','incorrect password'));
        }
    }else{
        return done(null, false, req.flash('message','The username does not exists'));
    }
}));

passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, username, password, done) => {
    const newUser = {
        username: username,
        password: password
    };

    newUser.password = await helpers.encryptPassword(password);
    const result = await db.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser); //serializeUser
    //req.flash('success', 'Link guardado correctamente');
    //res.redirect('/links');
}));

//Almacenar usuario en una session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const row = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, row[0]);
});

