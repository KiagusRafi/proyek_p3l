import React from 'react'
import { Link } from "react-router"

const NoContent = () => {
  return (
    <div className='flex flex-col gap-3 justify-self-center items-center border border-red-950 mt-[20vh] p-6 w-fit'>
        <h3 className=''>Mohon maaf, konten ini sedang di luar jangkauan</h3>
        <div className='inline-block px-4 py-2 border border-green-600 rounded-lg text-green-600 hover:bg-green-700 hover:text-white transition-colors'>
          <Link to={"/"}>Home</Link>
        </div>
    </div>
  )
}

export default NoContent