import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from '../api'

const BlogDetails = () => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`)
        setBlog(res.data)
      } catch (err) {
        console.error(err)
        setError('Failed to load blog.')
      }
    }
    fetchBlog()
  }, [id])

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>
  if (!blog) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
          <span className="text-xs px-2 py-1 bg-green-600 text-white rounded-full">{blog.category}</span>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          By <span className="font-medium">{blog.author}</span> | {new Date(blog.date).toLocaleString()}
        </p>

        <div className="text-gray-700 mb-6 whitespace-pre-line">{blog.content}</div>

        <Link
          to="/blogs"
          className="text-green-600 hover:text-green-800 font-medium"
        >
          ← Back to Blogs
        </Link>
      </div>
    </div>
  )
}

export default BlogDetails
