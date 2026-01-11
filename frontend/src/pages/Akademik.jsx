import React from 'react'
import SectionHeader from '../components/SectionHeader'
import Header from '../components/Header'

const Akademik = () => {
  return (
    <div>
        <Header/>
        <SectionHeader text="Ekstrakurikuler"/>
        <div className='flex justify-center items-center'>
<ul className="grid grid-cols-3 grid-rows-2 gap-4">
            <li className='m-5'>
                <div className=' bg-gray-300 justify-center items-center text-center p-2 rounded-md overflow-hidden'>
                    <img src="src/assets/ekskul/Pramuka.png" alt="foto Pramuka" className='w-full h-full object-cover'/>
                    <h2 className='font-mono font-extrabold text-3xl'>Pramuka</h2>
                </div>
            </li>
            <li className='m-5'>
  <div className='bg-gray-300 justify-center items-center text-center p-2 rounded-md overflow-hidden'>
    <img src="src/assets/ekskul/Qasidah.png" alt="foto Qasidah" className='w-full h-full object-cover'/>
    <h2 className='font-mono font-extrabold text-3xl'>Qasidah</h2>
  </div>
</li>

<li className='m-5'>
  <div className='bg-gray-300 justify-center items-center text-center p-2 rounded-md overflow-hidden'>
    <img src="src/assets/ekskul/Marawis.png" alt="foto Marawis" className='w-full h-full object-cover'/>
    <h2 className='font-mono font-extrabold text-3xl'>Marawis</h2>
  </div>
</li>

<li className='m-5'>
  <div className='bg-gray-300 justify-center items-center text-center p-2 rounded-md overflow-hidden'>
    <img src="src/assets/ekskul/Futsal.png" alt="foto Futsal" className='w-full h-full object-cover'/>
    <h2 className='font-mono font-extrabold text-3xl'>Futsal</h2>
  </div>
</li>

<li className='m-5'>
  <div className='bg-gray-300 justify-center items-center text-center p-2 rounded-md overflow-hidden'>
    <img src="src/assets/ekskul/Silat.png" alt="foto Silat" className='w-full h-full object-cover'/>
    <h2 className='font-mono font-extrabold text-3xl'>Silat</h2>
  </div>
</li>

<li className='m-5'>
  <div className='bg-gray-300 justify-center items-center text-center p-2 rounded-md overflow-hidden'>
    <img src="src/assets/ekskul/Tari.png" alt="foto Tari" className='w-full h-full object-cover'/>
    <h2 className='font-mono font-extrabold text-3xl'>Tari</h2>
  </div>
</li>
                    </ul>
        </div>
        
    </div>
  )
}

export default Akademik