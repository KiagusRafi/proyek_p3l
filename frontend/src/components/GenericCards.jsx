import React from 'react'

const GenericCards = ({items, rows, cols=2, containerH=50, cardColor="purple-300"}) => {
    const effectiveRows = rows ?? Math.ceil(items.length / cols);
    
  return (
    <div className={`bg-red-400 h-[${containerH}%] grid grid-cols-${cols} grid-rows-${effectiveRows} gap-2`}>
    </div>
  )
}
// {items.map((i) => (
//     <div className=' bg-gray-300' key={i._id || i.url}>
//         {i.url && <img src={i.url} alt="foto Pramuka" className='w-full h-full object-cover'/>}
//         {i.title && <h2 className='font-mono font-extrabold text-3xl'>{i.title}</h2>}
//         <p>tes</p>
//     </div>
// ))} 

export default GenericCards;