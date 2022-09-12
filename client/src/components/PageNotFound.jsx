import React from 'react'
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <div className=''>
            <h1 className='text-white text-6xl text-center mt-[18%] mb-4'>Page not found</h1>
            <Link to='/'><button className='w-40 py-4 my-2 ml-[45%]'>Back Home</button></Link>
        </div>
    </div>
  )
}

export default PageNotFound