const mongoose = require('mongoose');
const passportLocalMongoose  = require('passport-local-mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userSchema = new mongoose.Schema(
    {   
        name     : String,
        email    : String,
        password : String
    }
);

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());

module.exports = new mongoose.model('User', userSchema);

