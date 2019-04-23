const mongoose = require('mongoose');
const encrypt  = require('mongoose-encryption');

const userSchema = new mongoose.Schema(
    {
        email    : String,
        password : String
    }
);



module.exports = mongoose.model('User', userSchema);
