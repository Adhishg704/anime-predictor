import React from 'react';
import {Link} from "react-router-dom";

export default function Navbar() {
  return (
    <div className='w-100 p-4 bg-slate-800 '>
        <span className='text-3xl ml-5 text-yellow-100 font-semibold font-mono'>Anime-</span>
        <span className='text-3xl font-semibold font-mono text-gray-300'>Predictor</span>
        <Link to = "/">
          <span className='font-mono text-gray-300 ml-44'>Home</span>
        </Link>
        <Link to = "/">
          <span className='font-mono text-gray-300 ml-10'>About</span>
        </Link>
        <Link to = "/login">
          <span className='font-mono text-gray-300 ml-10'>Login</span>
        </Link>
        <Link to = "/signup">
          <span className='font-mono text-white ml-10 p-2 border border-white'>Sign up</span>
        </Link>
    </div>
  )
}
