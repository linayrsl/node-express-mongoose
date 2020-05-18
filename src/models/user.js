const mongoose = require('mongoose');

const User = new mongoose.model('user', {
    name: String,
    username: {
        type: String,
        required: true
    },
    email: String,
    created: {
        type: Date,
        default: new Date()
    }
});

module.exports = User;