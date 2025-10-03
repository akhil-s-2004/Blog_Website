import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import AddBlog from './components/Add'
import ReadBlogs from './components/Read'
import BlogDetails from './components/BlogDetails'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<AddBlog />} />
        <Route path='/blogs' element={<ReadBlogs />} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
