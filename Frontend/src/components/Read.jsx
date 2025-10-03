import React, { useEffect, useState } from 'react'
import axios from 'axios'

const categories = ['All', 'Books', 'Anime', 'Shows']

const Read = () => {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const baseUrl = import.meta.env.VITE_API_BASE_URL

  const fetchBlogs = async (category = null) => {
    try {
      let url = `${baseUrl}/blogs`
      if (category && category !== 'All') url += `?category=${category}`

      const response = await axios.get(url)
      setBlogs(response.data)
    } catch (err) {
      console.error(err)
      setError('Failed to fetch blogs.')
    }
  }

  useEffect(() => {
    fetchBlogs(selectedCategory)
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-green-700">Read Blogs</h1>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full font-medium transition ${
              selectedCategory === cat
                ? 'bg-green-700 text-white'
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {blogs.length === 0 ? (
        <p className="text-gray-500 text-center">No blogs available.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-green-100 p-6 rounded-2xl transition duration-300 hover:bg-green-200"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-green-800">{blog.title}</h2>
                <span className="text-xs px-2 py-1 bg-green-700 text-white rounded-full">
                  {blog.category}
                </span>
              </div>
              <p className="text-sm text-green-600 mb-1">
                By <span className="font-medium">{blog.author}</span>
              </p>
              <p className="text-green-900 mb-3">
                {blog.excerpt ? blog.excerpt : blog.content.substring(0, 150) + '...'}
              </p>
              <p className="text-xs text-green-600 text-right">
                {new Date(blog.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Read
