import React from 'react'

import { useFetchTable, useDeleteItem } from '../lib/utils';
import GenericImageCard from './GenericImageCard';
import BeritaCard from './BeritaCard';

const GambarList = () => {
  const { 
    data: gambars, 
    loading: fetchGambarLoading, 
    error: fetchGambarError, 
    setData: setGambars
  } = useFetchTable("/sdncs1/gambar");

  const {
    deleteItem: deleteGambar, 
    loading: deleteGambarLoading, 
    error: deleteGambarError
  } = useDeleteItem("/sdncs1/gambar")

  const handleDeleteGambar = async (id) => {
    const ok = await deleteGambar(id);
    if (ok) setGambars((prev) => prev.filter((img) => img._id !== id));
  };

const gambarCards = gambars.map((g) => (
  <GenericImageCard 
    key={g._id} 
    gambar={g} 
    onDelete={handleDeleteGambar} 
  />
));
  

  return (
    <div>
      {gambarCards}
    </div>
  )
}

export default GambarList