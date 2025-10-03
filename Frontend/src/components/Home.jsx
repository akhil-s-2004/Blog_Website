import React, { useEffect, useState } from 'react'
import axios from '../api'
import BlogCard from './BlogCard'

const Home = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get('/blogs')
      setBlogs(res.data.slice(0, 4)) // Show latest 4 blogs
    }
    fetchBlogs()
  }, [])

  return (
    <div className='min-h-screen px-6 py-12 bg-gray-50'>
      <h1 className='text-5xl font-bold text-center mb-8 text-gray-800'>Welcome to BlogEasy</h1>
      <p className='text-center text-gray-600 mb-12'>
        Explore the latest reviews and stories in Books, Anime, and Shows!
      </p>

      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </div>
  )
}

export default Home
