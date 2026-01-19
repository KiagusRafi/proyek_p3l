import React from 'react'
import SectionHeader from '../components/SectionHeader'
import Header from '../components/Header'
import ImageGallery from '../components/ImageGallery'

import staff from '../assets/org/misc/Group 22.png'

const StrukturOrg = () => {
  const allImageModules = import.meta.glob('/src/assets/org/**/*.{png,jpg,jpeg,svg}', { eager: true });

  function loadImages(f) {
    // Parameter 'f' adalah nama subfolder yang ingin kita filter, misal 'kolam-renang'
    const targetFolder = `/src/assets/org/${f}/`; // Path yang ingin kita cari
    
    // 1. Dapatkan semua path file dari hasil glob
    const paths = Object.keys(allImageModules);
    
    // 2. Filter path yang hanya milik subfolder yang diminta 'f'
    const filteredPaths = paths.filter(path => path.startsWith(targetFolder));
    
    // 3. Ambil nilai default (URL gambar) dari modul yang difilter
    const filteredModules = filteredPaths.map(path => allImageModules[path].default);
    
    return filteredModules;
  }

  const kepsek = loadImages("kepsek");
  const guru = loadImages("guru")

  return (
    <div>
        <Header/>
        <SectionHeader text="Kepala Sekolah & Wakil"/>
        <ImageGallery images={kepsek}/>
        <SectionHeader text="Guru"/>
        <ImageGallery images={guru}/>
        <SectionHeader text="Staff"/>
        <img src={staff} alt='staff'/>
    </div>
  )
}

export default StrukturOrg