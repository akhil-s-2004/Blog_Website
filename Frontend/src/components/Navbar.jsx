import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <nav className='bg-gray-900 text-white shadow-md'>
    <div className='max-w-7xl mx-auto flex justify-between items-center px-6 py-4'>
      <Link to='/' className='text-2xl font-bold hover:text-green-400'>BlogEasy</Link>
      <ul className='flex space-x-6'>
        <li><Link to='/' className='hover:text-green-400'>Home</Link></li>
        <li><Link to='/blogs' className='hover:text-green-400'>Read Blogs</Link></li>
        <li><Link to='/add' className='hover:text-green-400'>Add Blog</Link></li>
      </ul>
    </div>
  </nav>
)

export default Navbar
