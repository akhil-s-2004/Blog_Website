import React, { useEffect, useState } from 'react'
import axios from '../api'
import BlogCard from './BlogCard'

const categories = ['All', 'Books', 'Anime', 'Shows']

const Read = () => {
  const [blogs, setBlogs] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  const fetchBlogs = async () => {
    let url = '/blogs'
    if (selectedCategory !== 'All') url += `?category=${selectedCategory}`
    const res = await axios.get(url)
    setBlogs(res.data)
  }

  useEffect(() => { fetchBlogs() }, [selectedCategory])

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <h1 className='text-4xl font-bold text-center mb-6 text-gray-800'>Read Blogs</h1>

      <div className='flex justify-center gap-4 mb-6'>
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full ${selectedCategory===cat?'bg-green-600 text-white':'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            onClick={()=>setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {blogs.length ? blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)
        : <p className='text-center text-gray-500 col-span-full'>No blogs available.</p>}
      </div>
    </div>
  )
}

export default Read
