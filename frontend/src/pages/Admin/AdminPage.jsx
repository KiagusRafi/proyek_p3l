import { Link } from 'react-router';
import { CirclePlus } from 'lucide-react';

import BeritaList from '../../components/BeritaList';
import SectionHeader from '../../components/SectionHeader';

const AdminPage = () => {

  return (
    <div className='flex bg-white w-[100vw] py-4 justify-center align-middle'>
      <div className='w-[80%] bg-[#f2f2f2] p-4'>
      <SectionHeader text="Atur berita"/>
        <Link to="/admin/createberita" className='flex w-[100%] btn btn-primary text-lg bg-green-300 hover:bg-green-400'><CirclePlus/> Buat berita baru</Link>
        <div className='p-4'>
          <BeritaList to="/admin/berita"/>
        </div>
      </div>
    </div>
  );

}





export default AdminPage