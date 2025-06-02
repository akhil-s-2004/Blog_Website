import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-4">
        Welcome to BlogEasy
      </h1>

      <h2 className="text-xl md:text-2xl text-green-800 font-semibold mb-2">
        Read. Write. Inspire.
      </h2>

      <p className="text-green-700 max-w-xl text-md">
        Dive into a world of thoughts and stories. Create your own blog or explore what others have to share!
      </p>
    </div>
  )
}

export default Home
