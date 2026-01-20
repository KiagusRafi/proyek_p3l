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

    // Gunakan useEffect untuk menangani side-effect seperti rate limiting
    useEffect(() => {
        if (fetchError?.status === 429 || deleteError?.status === 429) {
            setIsRateLimited(true);
        }
    }, [fetchError, deleteError]);

    const handleDelete = async (id) => {
        const ok = await deleteItem(id);
        if (ok) setBerita((prev) => prev.filter((img) => img._id !== id));
    };

    // Pastikan berita adalah array sebelum di-map
    const beritaCards = Array.isArray(berita) ? berita.map((b) => (
        <BeritaCard 
            key={b._id} 
            berita={b} 
            destination={`${to}/${b._id}`} 
            setBerita={setBerita} 
            onDelete={handleDelete}
        />
    )) : [];

    if (fetchLoading) return <Loading />;

    return (
        <div>
            {isRateLimited && <RateLimitedUI />}
            {deleteLoading && (
                <div className='min-h-screen bg-base-200 flex items-center justify-center'>
                    <LoaderIcon className="animate-spin size-10" />
                    <p>Menghapus...</p>
                </div>
            )}
            {!deleteLoading && <Paginator elements={beritaCards} rows={1} cols={3} />}
        </div>
    );
};

export default BeritaList;
