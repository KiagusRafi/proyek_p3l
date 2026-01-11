// import React, { useState } from "react";
import ReactPaginate from "react-paginate";

import { useState, useEffect } from 'react'
import { LoaderIcon } from 'lucide-react';
import toast from "react-hot-toast";

import api from "../../lib/axios";
import BeritaCard from './BeritaCard';
import RateLimitedUI from './RateLimitedUi';


const PaginatedGrid = ({ elements, rows = 2, cols = 3 }) => {
  const itemsPerPage = rows * cols;
  const [currentPage, setCurrentPage] = useState(0);

  // slice elemen sesuai halaman
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentElements = elements.slice(startIndex, endIndex);

  // total halaman
  const pageCount = Math.ceil(elements.length / itemsPerPage);

  // handler perubahan halaman
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // hitung slot kosong agar grid tetap penuh
  const emptySlots = itemsPerPage - currentElements.length;

  return (
    <div className="space-y-4">
      {/* Kontainer grid */}
      <div
        className="grid gap-4 min-h-[16rem]"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {currentElements}
        {Array.from({ length: emptySlots }).map((_, idx) => (
          <div
            key={`empty-${idx}`}
            className="bg-transparent border border-dashed border-gray-300 rounded"
          />
        ))}
      </div>

      {/* Navigasi dengan ReactPaginate */}
      <ReactPaginate
        previousLabel={"← Prev"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center gap-2"}
        pageClassName={"px-3 py-1 bg-gray-200 rounded"}
        activeClassName={"bg-blue-500 text-white"}
        previousClassName={"px-3 py-1 bg-gray-200 rounded"}
        nextClassName={"px-3 py-1 bg-gray-200 rounded"}
        disabledClassName={"opacity-50 cursor-not-allowed"}
      />
    </div>
  );
};


export default function App() {
  // contoh: data sudah berupa array elemen JSX
//   const elements = Array.from({ length: 14 }, (_, i) => (
//     <div
//       key={i}
//       className="bg-blue-100 p-4 rounded shadow text-center"
//     >
//       Item {i + 1}
//     </div>
//   ));



    const [loading, setLoading] = useState(true)
    const [berita, setBerita] = useState([])
    const [isRateLimited, setIsRateLimited] = useState(false);

    useEffect(()=> {
        const fetchBerita = async () => {
            try {
              const res = await api.get("/sdncs1")
              setBerita(res.data);
              // console.log(res.data);
            } catch (error) {
              console.log("Error fetching news",error)
              if (error.response?.status == 429){
                setIsRateLimited(true)
              } else {
                toast.error("Failed to load news")
              }
            } finally {
              setLoading(false);
            }
        }     
      fetchBerita();
      }, []);

      const data = berita.map((b) => (<BeritaCard key={b._id} berita={b} destination={`berita/${b._id}`} setBerita={setBerita}/>))

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Paginated Grid (Array HTML)</h1>
      <PaginatedGrid elements={data} rows={1} cols={3} />
    </div>
  );

}

