import React from 'react'
import SectionHeader from '../components/SectionHeader'
import Header from '../components/Header'
import ImageGallery from '../components/ImageGallery'
// /src/assets/images
const Fasilitas = () => {
// import.meta.glob harus berupa string literal statis
  const allImageModules = import.meta.glob('/src/assets/fasilitas/**/*.{png,jpg,jpeg,svg}', { eager: true });

  function loadImages(f) {
    // Parameter 'f' adalah nama subfolder yang ingin kita filter, misal 'kolam-renang'
    const targetFolder = `/src/assets/fasilitas/${f}/`; // Path yang ingin kita cari
    
    // 1. Dapatkan semua path file dari hasil glob
    const paths = Object.keys(allImageModules);
    
    // 2. Filter path yang hanya milik subfolder yang diminta 'f'
    const filteredPaths = paths.filter(path => path.startsWith(targetFolder));
    
    // 3. Ambil nilai default (URL gambar) dari modul yang difilter
    const filteredModules = filteredPaths.map(path => allImageModules[path].default);
    
    return filteredModules;
  }

// Contoh pemanggilan:
// const kolamRenangImages = loadImages('kolam-renang');

  const images = loadImages("gedung");
  const rg = loadImages("ruangguru");
  const penunjang = loadImages("penunjang");
  const fpd = loadImages("fpd");
  const fps = loadImages("fps");

  return (
    <div>
      <Header/>
      <SectionHeader text="Gedung & Bangunan"/>
      <ImageGallery images={images}/>
      <SectionHeader text="Ruangan Kepsek & Guru"/>
      <ImageGallery images={rg}/>
      <SectionHeader text="Penunjang Pembelajaran" className="text-center"/>
      <ImageGallery images={penunjang}/>
      <SectionHeader text="Fasilitas Murid"/>
      <ImageGallery images={fpd}/>
      <SectionHeader text="Penunjang Sekolah"/>
      <ImageGallery images={fps}/>

    </div>
  )
}

export default Fasilitas