const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
// This code defines a Mongoose schema and model for a blog post in a Node.js application.
// The schema includes fields for the title, author, content, and date of the blog post.