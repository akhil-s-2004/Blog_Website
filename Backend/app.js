const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to DB'))
    .catch(err => {
        console.error('Error connecting to DB', err);
        process.exit(1);
    });

// Blog Schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ['Books', 'Anime', 'Shows'], required: true },
    excerpt: { type: String }, // Optional short preview
    date: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

// ------------------- Routes -------------------

// Create a blog post
app.post('/blogs', async (req, res) => {
    try {
        const { title, author, content, category, excerpt } = req.body;

        // Validation
        if (!title || !author || !content || !category) {
            return res.status(400).json({ error: "Title, author, content, and category are required" });
        }

        const blog = new Blog({ title, author, content, category, excerpt });
        await blog.save();

        res.status(201).json({ message: "Blog post created successfully", blog });
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Get all blog posts (with optional category or search filter)
app.get('/blogs', async (req, res) => {
    try {
        const { category, search } = req.query;
        let filter = {};

        if (category) filter.category = category;
        if (search) filter.title = { $regex: search, $options: 'i' };

        const blogs = await Blog.find(filter).sort({ date: -1 }); // newest first
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update a blog post
app.patch('/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ error: "Invalid blog ID" });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });
        res.status(200).json({ message: "Blog post updated successfully", blog: updatedBlog });
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Delete a blog post
app.delete('/blogs/:id', async (req, res) => {
    try {
        const blogId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ error: "Invalid blog ID" });
        }

        await Blog.findByIdAndDelete(blogId);
        res.status(200).json({ message: "Blog post deleted successfully" });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ------------------------------------------------

app.listen(port, () => {
    console.log(`Blog backend running on port ${port}`);
});
