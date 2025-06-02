import React, { useState } from 'react'
import axios from 'axios'

const AddBlog = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  const baseUrl = import.meta.env.VITE_API_BASE_URL

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !author || !content) {
      setError('All fields are required.')
      setMessage('')
      return
    }

    try {
      const response = await axios.post(baseUrl, { title, author, content })
      console.log('Blog added:', response.data)
      setMessage('Blog successfully added!')
      setTitle('')
      setAuthor('')
      setContent('')
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Failed to add blog. Make sure the backend is running.')
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">Add a Blog</h2>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setError(null)
              setMessage('')
            }}
            placeholder="Enter blog title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value)
              setError(null)
              setMessage('')
            }}
            placeholder="Enter author name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              setError(null)
              setMessage('')
            }}
            placeholder="Enter blog content"
            rows="5"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Add Blog
        </button>
      </form>
    </div>
  )
}

export default AddBlog
