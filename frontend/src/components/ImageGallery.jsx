// ImageGallery.jsx
import React from 'react';

function ImageGallery({ images }) {
  // Hanya fokus pada layout yang Anda berikan sebelumnya
  if (!images || images.length === 0) {
    return <p className="text-center text-gray-400 p-4">Tidak ada gambar yang dimuat.</p>;
  }

  return (
    // Gunakan class yang Anda inginkan: grid 3 kolom, gap 4, padding 4, lebar 80%
    <div className="grid grid-cols-3 gap-4 p-4 w-[80%] mx-auto"> 
      {images.map((src, i) => (
        <img
          key={i}
          src={src} 
          alt={`Gambar Galeri ${i + 1}`}
          className="w-full h-auto rounded shadow object-cover"
          loading="lazy"
        />
      ))}
    </div>
  );
}

export default ImageGallery;