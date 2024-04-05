const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const pool = require("../config/db");
const bcrypt = require("bcrypt");

const userField = {
    usernameField: "username",
    passwordField: "password"
}

async function authenticate(username, password, done) {
    try {
        const user = await pool.query('SELECT * FROM "user" WHERE username = $1', [username]);
        if (!user.rowCount) return done(null, false, { message: "User not found"});
        const isPasswordMatched = await bcrypt.compare(password, user.rows[0].password);
        if (!isPasswordMatched) return done(null, false, { message: "Password or Email is incorrect!"});
        return done(null, user.rows[0].id);
    } catch(error) {
        console.log(error.message);
        return done(null, false, { message: "Something went wrong"});
    }
}


passport.serializeUser(async (id,done) => {
    try {
        const user = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
        if (!user.rowCount) return done(null, false, { message: "User not found"});
        done(null, id);
    } catch(error) {
        done(error)
    }

});

passport.deserializeUser( async (id,done) => {
    try {
        const user = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
        if (!user.rowCount) return done(null, false, { message: "User not found"});
        done(null, id);
    } catch (error) {
        done(error)
    }
});

passport.use(new LocalStrategy(userField, authenticate));