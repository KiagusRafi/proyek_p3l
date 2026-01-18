import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router';
import toast from 'react-hot-toast';
import { CirclePlus } from 'lucide-react';

import api from '../../lib/axios';
import BeritaCard from '../../components/BeritaCard';
import CreateBeritaPage from './CreateBeritaPage';
import { useDeleteItem, useFetchTable } from '../../lib/utils';
import BeritaList from '../../components/BeritaList';
import GenericImageCard from '../../components/GenericImageCard';
import SectionHeader from '../../components/SectionHeader';
import UploadGambar from '../../components/UploadGambar';
import GambarList from '../../components/GambarList';

const AdminPage = () => {

  return (
    <div className='flex bg-white w-[100vw] py-4 justify-center align-middle'>
      <div className='w-[80%] bg-[#f2f2f2] p-4'>
      <SectionHeader text="Atur berita"/>
        <Link to="/admin/createberita" className='flex w-[100%] btn btn-primary text-lg bg-green-300 hover:bg-green-400'><CirclePlus/> Buat berita baru</Link>
        <div className='p-4'>
          <BeritaList to="/admin/berita"/>
        </div>
        <SectionHeader text="Atur aset gambar"/>
        {/* <div>
        <UploadGambar/>
        <GambarList/>
        </div> */}
      </div>
    </div>
  );

}





export default AdminPage