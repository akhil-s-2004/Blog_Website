import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Read = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  const baseUrl = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}`)
        if (response.status !== 200) {
          throw new Error('Failed to fetch blogs')
        }
        setData(response.data)
      } catch (error) {
        setError(error.message || "Server interaction failed")
      }
    }
    fetchData()
  }, [])

  if (error) return <p className="text-red-500 text-center mt-4">Error: {error}</p>

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-700">Read Blogs</h1>

      {data.length === 0 ? (
        <p className="text-gray-500 text-center">No blogs available.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {data.map((blog) => (
            <div
              key={blog._id}
              className="bg-green-100 p-6 rounded-2xl transition duration-300 hover:bg-green-200"
            >
              <h2 className="text-2xl font-semibold text-green-800 mb-2">{blog.title}</h2>
              <p className="text-sm text-green-600 mb-1">
                By <span className="font-medium">{blog.author}</span>
              </p>
              <p className="text-green-900 mb-3">{blog.content}</p>
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
