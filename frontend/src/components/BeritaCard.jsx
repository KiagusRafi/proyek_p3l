import React from 'react'
import { Link, useLocation } from 'react-router'
import { Trash2Icon } from 'lucide-react'

import {formatDate} from "../lib/utils"

const BeritaCard = ({berita, destination, onDelete}) => {
  const loc = useLocation();
  const admin = loc.pathname === "/admin"

  return (
    <div to={destination}  className="card card-compact bg-base-100 w-63 shadow-xl flex-shrink-0 line-clamp-2"> 
        <figure className='h-[50%]'>
            <img
             src={berita.thumbnailUrl}
             className='w-full h-full object-cover' 
             ></img>
          </figure>
        <div className="card-body flex">

        <h3 className="card-title">{berita.title}</h3>
        <p className='line-clamp-2 '>{berita.content}</p>
        <div className="card-actions justify-end">
          <p className="text-sm text-base-content/60">
            {formatDate(new Date(berita.createdAt))}
          </p>
        </div>
        <div className="card-actions justify-end">
      {!admin ? 
      <Link to={destination} className="btn btn-primary">Read More...</Link>
      : <Link to={destination} className='btn btn-primary'>Edit</Link>}
    </div>
        {admin && (
          <button
            className="card-actions justify-self-center"
            onClick={() => {onDelete(berita._id);}}
          >
            <Trash2Icon className="size-8" />
          </button>
        )}
      </div>
    </div>
  )
}

export default BeritaCard