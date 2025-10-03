import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => (
  <div className='bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition'>
    <div className='flex justify-between items-center mb-2'>
      <h2 className='text-xl font-semibold'>{blog.title}</h2>
      <span className='text-xs px-2 py-1 bg-green-500 text-white rounded-full'>{blog.category}</span>
    </div>
    <p className='text-gray-600 mb-3'>{blog.excerpt || blog.content.substring(0, 100) + '...'}</p>
    <p className='text-xs text-gray-500 mb-3'>By {blog.author}</p>
    <Link
      to={`/blogs/${blog._id}`}
      className='text-green-600 hover:text-green-800 font-medium'
    >
      Read More →
    </Link>
  </div>
)

export default BlogCard
