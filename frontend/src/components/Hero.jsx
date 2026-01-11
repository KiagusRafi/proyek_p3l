import React, { useState, useEffect } from "react";

import api from "../lib/axios"; // pastikan sudah ada konfigurasi axios
import Loading from "./Loading"
import { useFetchTable } from "../lib/utils";

const Hero = () => {
  const paramsQuery = { key: "untuk", value: "hero" }

  const [currentIndex, setCurrentIndex] = useState(0);
  const {data: images, loading: bedaLoading, error, setData: setImages} = useFetchTable("/sdncs1/admin/gambar/search", paramsQuery)
  // const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false)

  // // Fetch gambar dari backend
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const res = await api.get("/sdncs1/gambar"); // endpoint backend kamu
  //       setImages(res.data); // asumsi res.data = [{url, picId}, ...]
  //     } catch (error) {
  //       if (error.response?.status == 404){
  //         console.log("tidak ada gambar untuk carousel.", error)
  //       } else {
  //         console.error("Error fetching images:", error);
  //       }
  //     } finally {
  //       setLoading(false)
  //     }
  //   };
  //   fetchImages();
  // }, []);


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
    <div
  className="hero min-h-[30vh]"
  style={{
    backgroundImage: `url(${images[currentIndex].url})`,
  }}>
      {loading && <Loading/>}

  <div className="hero-overlay bg-opacity-40 bg-slate-500"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-lg">
      <h1 className="mb-5 text-5xl font-bold text-white">Selamat Datang!</h1>
      <p className="mb-5 text-2xl text-white">
        Di sekolah penggerak SDN Cipete Selatan 01
      </p>
    </div>
  </div>
</div>
  )
}

export default Hero