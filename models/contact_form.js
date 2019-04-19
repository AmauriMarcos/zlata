const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        telefone: Number,
        message: String
    }
)

module.exports = mongoose.model('Contact', contactFormSchema);