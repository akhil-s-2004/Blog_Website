const express = require('express')
const mongoose = require('mongoose')
const Blog=require('./models/blogs')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors());
app.use(express.json())
require('dotenv').config()
const uri = process.env.MONGODB_URI
console.log(uri)


main()
.then(()=>{
    console.log('Connected to DB')
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})

.catch((err)=>{
    console.log('Error connecting to DB',err);
    process.exit(1);
    })

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}
// app.get('/', (req, res) =>
//     res.send('Hello World! This is the backend server for the blog application.'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//add a blog post
app.post('/', async (req, res) => {
    try{
        if(!req.body){
            return res.status(400).json({error:"No data provided"})
        }
        const {title, author, content} = req.body
        const blog = new Blog({
            title,
            author,
            content
        })
        await blog.save()
        const blogs = await Blog.find()
        res.status(201).json({message: "Blog post created successfully", blogs})
    } catch (error) {
        console.error('Error creating blog post:', error);
    }
})

//get all blog posts
app.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.status(200).json(blogs)
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({error: "Internal server error"})
    }
})

//update a blog post
app.patch('/:id', async (req, res) => {
    try {
        const blogId= req.params.id
        if (!blogId) {
            return res.status(400).json({error: "Blog ID is required"})
        }
        if (!req.body) {
            return res.status(400).json({error: "No data provided"})
        }
        if(!mongoose.Types.ObjectId.isValid(blogId)){
            return res.status(400).json({error: "Invalid blog ID"})
        }
        const blog = await Blog.findByIdAndUpdate(blogId, req.body, {new: true})
        res.status(200).json({message: "Blog post updated successfully", blog})
    } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({error: "Internal server error"})
    }
})

//delete a blog post
app.delete('/:id', async (req, res) => {
    try {
        const blogId = req.params.id
        if (!blogId) {
            return res.status(400).json({error: "Blog ID is required"})
        }
        if(!mongoose.Types.ObjectId.isValid(blogId)){
            return res.status(400).json({error: "Invalid blog ID"})
        }
        await Blog.findByIdAndDelete(blogId)
        res.status(200).json({message: "Blog post deleted successfully"})
    } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({error: "Internal server error"})
    }
})