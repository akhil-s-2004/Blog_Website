import React from 'react'
import bgImage from '../../images/bg_home.jpg' // adjust based on your actual filename

const Home = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center text-center px-4 py-10"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>

      {/* Overlay Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4 drop-shadow-lg">
          Welcome to BlogEasy
        </h1>

        <h2 className="text-xl md:text-2xl text-green-900 font-semibold mb-2 drop-shadow">
          Read. Write. Inspire.
        </h2>

        <p className="text-green-900 max-w-xl text-md drop-shadow">
          Dive into a world of thoughts and stories. Create your own blog or explore what others have to share!
        </p>
      </div>
    </div>
  )
}

export default Home

