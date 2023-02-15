const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        require: true
    }
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;