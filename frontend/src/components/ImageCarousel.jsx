import React, { useState, useEffect } from "react";

import api from "../lib/axios"; // pastikan sudah ada konfigurasi axios
import Loading from "./Loading"

const ImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true)

  // Fetch gambar dari backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get("/sdncs1/gambar"); // endpoint backend kamu
        setImages(res.data); // asumsi res.data = [{url, picId}, ...]
      } catch (error) {
        if (error.response?.status == 404){
          console.log("tidak ada gambar untuk carousel.", error)
        } else {
          console.error("Error fetching images:", error);
        }
      } finally {
        setLoading(false)
      }
    };
    fetchImages();
  }, []);


  // Auto slide setiap 3 detik
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval); // bersihkan interval saat unmount
  }, [images]);

  if (images.length === 0) {
    return ;
  }

  return (
    <div className="relative w-full max-w-xl mx-auto my-4">
      {loading && <Loading/>}
      {/* Render gambar */}
      <img
        src={images[currentIndex].url}
        alt={`Slide ${images[currentIndex].picId}`}
        className="w-full h-64 object-cover rounded-lg shadow-md"
      />

      {/* Tombol manual navigasi */}
      <button
        onClick={() =>
          setCurrentIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
          )
        }
        className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white px-2 py-1 rounded"
      >
        ‹
      </button>
      <button
        onClick={() =>
          setCurrentIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
          )
        }
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white px-2 py-1 rounded"
      >
        ›
      </button>


    </div>
  );
};

export default ImageCarousel;