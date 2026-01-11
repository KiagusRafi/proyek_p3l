import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router';
import { LoaderIcon } from 'lucide-react';

import BeritaList from '../../components/BeritaList';
import CreateBerita from '../../components/CreateBerita';

const AdminBerita = () => {
  // const [berita, setBerita] = useState([]);

  return (
    <div>
      <CreateBerita />
      <BeritaList to="/admin/berita"/>
    </div>
  )
}

export default AdminBerita