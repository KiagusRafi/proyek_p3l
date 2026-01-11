import { useState, useEffect } from 'react'
import { LoaderIcon } from 'lucide-react';
import toast from "react-hot-toast";

// import api from "../lib/axios";
import Loading from './Loading';
import BeritaCard from './BeritaCard';
import RateLimitedUI from './RateLimitedUi';
import Paginator from './Paginator';
import { useDeleteItem, useFetchTable } from '../lib/utils';

const BeritaList = ({ to }) => {
    const { data: berita, loading: fetchLoading, error: fetchError, setData: setBerita } = useFetchTable("/sdncs1");
    const { deleteItem, loading: deleteLoading, error: deleteError } = useDeleteItem("/sdncs1/admin/berita");
    const [isRateLimited, setIsRateLimited] = useState(false);

    if (fetchError || deleteError){
      if (error.response?.status == 429){
        setIsRateLimited(true)
      }
    }

    const handleDelete = async (id) => {
      const ok = await deleteItem(id);
      if (ok) setBerita((prev) => prev.filter((img) => img._id !== id));
    };

    const beritaCards = berita.map((b) => (
      <BeritaCard 
        key={b._id} 
        berita={b} 
        destination={`${to}/${b._id}`} 
        setBerita={setBerita} 
        onDelete={handleDelete}/>
      )
    )


  return (
    <div>
        {isRateLimited && <RateLimitedUI/>}
        {deleteLoading && 
        <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className="animate-spin size-10"/>
         Loading...
       </div>}
       {!deleteLoading && <Paginator elements={beritaCards} rows={1} cols={3}/>}
    </div>
  );
};

export default BeritaList;
