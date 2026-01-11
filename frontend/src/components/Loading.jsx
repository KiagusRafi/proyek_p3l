import React from 'react'
import { LoaderIcon } from 'lucide-react'

const Loading = () => {
  return (
    <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className="animate-spin size-10"/>
         Loading...
       </div>
  )
}

export default Loading
