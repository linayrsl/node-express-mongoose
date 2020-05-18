const mongoose = require('mongoose');

const Post = new mongoose.model('post', {
    userId: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true
    }
});

module.exports = Post;