const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refer: 'users'
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        default: 'personal',
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('contact', ContactSchema);
