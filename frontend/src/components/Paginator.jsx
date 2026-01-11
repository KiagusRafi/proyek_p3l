import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const Paginator = ({ elements, rows, cols = 3 }) => {
  const effectiveRows = rows ?? Math.ceil(items.length / cols);
  const itemsPerPage = effectiveRows * cols;
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
          gridTemplateRows: `repeat(${effectiveRows}, minmax(0, 1fr))`,
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

export default Paginator;