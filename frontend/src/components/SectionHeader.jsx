import React from 'react'

const SectionHeader = ({text, justify="center"}) => {
  return (
    <div className={`flex justify-${justify} items-center`}>
        <h1 className='text-6xl my-10 font-bold'>{text}</h1>
    </div>
  )
}

export default SectionHeader