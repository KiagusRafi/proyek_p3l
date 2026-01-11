import React from 'react'
import Navbar from './Navbar.jsx'

const Header = () => {
  return (
        <div className="bg-slate-300 my-1">
      <div className='flex items-center justify-center'>
        <img className="h-[50%]" src="src\assets\logo_sdncs1.svg" alt="logo sdncs1" />
        <h1 className='text-6xl'>SDN Cipete Selatan 01</h1>
      </div>

      <Navbar />
      </div>
  )
}

export default Header;