import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast, LoaderIcon } from 'react-hot-toast';

import { useFetchTable } from '../lib/utils';
import NoContent from '../components/NoContent';

const BeritaDetail = () => {
  const navigate = useNavigate()

  const { id } = useParams();
  
  const { data: berita, loading, error } = useFetchTable(`/sdncs1/berita/${id}`)

  // loading state
  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className="animate-spin size-10"/>
      </div>
    );
  }

  if (error) {return (<NoContent/>)}

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
        <img
          src={berita.thumbnailUrl}
          alt={berita.title}
          className="w-full h-[400px] object-cover rounded-xl mb-6"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          {berita.title}
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed text-justify">
          {berita.content}
        </p>
      </div>
    </div>

  )
}

export default BeritaDetail