import React, { useState } from 'react'
import axios from '../api'

const Add = () => {
  const [form, setForm] = useState({ title: '', author: '', content: '', category: 'Books', excerpt: '' })
  const [message, setMessage] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { title, author, content, category } = form
    if (!title || !author || !content || !category) return alert('Fill all required fields')

    await axios.post('/blogs', form)
    setMessage('Blog added successfully!')
    setForm({ title: '', author: '', content: '', category: 'Books', excerpt: '' })
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-6'>
      <form className='bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4' onSubmit={handleSubmit}>
        <h2 className='text-2xl font-bold text-center text-gray-800'>Add a Blog</h2>
        {message && <p className='text-green-600 text-center'>{message}</p>}

        <input name='title' value={form.title} onChange={handleChange} placeholder='Title' className='w-full border rounded px-4 py-2' />
        <input name='author' value={form.author} onChange={handleChange} placeholder='Author' className='w-full border rounded px-4 py-2' />

        <select name='category' value={form.category} onChange={handleChange} className='w-full border rounded px-4 py-2'>
          <option>Books</option>
          <option>Anime</option>
          <option>Shows</option>
        </select>

        <input name='excerpt' value={form.excerpt} onChange={handleChange} placeholder='Excerpt (Optional)' className='w-full border rounded px-4 py-2' />
        <textarea name='content' value={form.content} onChange={handleChange} placeholder='Content' rows='5' className='w-full border rounded px-4 py-2'></textarea>

        <button type='submit' className='w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition'>Add Blog</button>
      </form>
    </div>
  )
}

export default Add
