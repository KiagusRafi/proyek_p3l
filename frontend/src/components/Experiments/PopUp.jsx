import React from 'react'
import { useState } from 'react';

//title, content, thumbnailUrl, createdAt, setIsOpen
const PopUp = () => {
const [isOpen, setIsOpen] = useState(false);
    const title = "nitnut";
    const description = "ngig"

    return (
        <>
        {/* Card */}
        <div 
            onClick={() => setIsOpen(true)} 
            className="cursor-pointer p-4 border rounded shadow hover:bg-gray-100"
        >
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>

        {/* Modal */}
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg relative w-96">
                {/* Tombol X */}
                <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
                >
                ✕
                </button>
            nitnut
            </div>
            </div>
        )}
        </>
  );
}

export default PopUp