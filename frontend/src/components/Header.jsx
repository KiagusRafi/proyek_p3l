import React from 'react'
import Navbar from './Navbar.jsx'

import logo from '../assets/logo_sdncs1.svg'

const Header = () => {
  return (
        <div className="">
      <div className='flex items-center justify-left px-[15%]'>
        <img className="h-20 m-2" src={logo} alt="logo sdncs1" />
        <div className=''>
          <h1 className='text-4xl ml-[5%] block w-[100%] my-0.5'>SDN Cipete Selatan 01</h1>
          <h3 className='ml-[5%] block w-[100%] my-0.5'>Sekolah Penggerak</h3>
        </div>
      </div>

      <Navbar />
      </div>
  )
}

export default Header;