import React from 'react'

import { Trash2Icon } from 'lucide-react';

const GenericImageCard = ({gambar, onDelete}) => {
  const safeStringify = (obj) => {
    try {
      return JSON.stringify(obj);
    } catch {
      return "";
    }
  };
  
  const meta = safeStringify(gambar.metadata);

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
    {gambar.url && 
        <figure>
            <img
            src={gambar.url}
            alt="Shoes" />
        </figure>
    }
    <div className="card-body">
        <h2 className="card-title">
        {gambar.url ?? "unknown"}
        </h2>
        <div className="badge badge-secondary">{gambar.untuk ?? "untuk sesuatu"}</div>
        <p>{meta}</p>
                  <button
            className="card-actions justify-self-center"
            onClick={() => {onDelete(gambar._id);}}
          >
            <Trash2Icon className="size-8" />
          </button>
    </div>
    </div>
  )
}

export default GenericImageCard