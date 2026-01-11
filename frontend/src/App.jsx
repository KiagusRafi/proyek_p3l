import {Route, Routes} from 'react-router';
import toast, { Toaster } from 'react-hot-toast';

import HomePage from "./pages/HomePage.jsx"
import BeritaDetail from './pages/BeritaDetail.jsx';
import Akademik from './pages/Akademik.jsx';
import ProfilPage from './pages/ProfilPage.jsx';
import Fasilitas from './pages/Fasilitas.jsx';
import StrukturOrg from './pages/StrukturOrg.jsx';

import AdminBerita from './pages/Admin/AdminBerita.jsx'
import AdminPage from './pages/Admin/AdminPage.jsx';
import Tes from './pages/Tes.jsx';
import BeritaUpdatePage from './pages/Admin/BeritaUpdatePage.jsx';
import CreateBeritaPage from './pages/Admin/CreateBeritaPage.jsx';
//<button onClick={()=> toast.error("congrats")} className="text-red-950 p-4 bg-pink-400 bg">lcick me</button><Toaster/>

const App = () => {
  return (
    <div data-theme="pastel">
      <Toaster/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/berita/:id" element={<BeritaDetail/>}/>
        <Route path='/fasilitas' element={<Fasilitas/>}/>
        <Route path="/akademik" element={<Akademik/>}/>
        <Route path='/profil' element={<ProfilPage/>}/>
        <Route path='/org' element={<StrukturOrg/>}/>

        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/admin/createberita" element={<CreateBeritaPage/>}/>
        <Route path="/admin/berita" element={<AdminBerita />}/>
        <Route path="/admin/berita/:id" element={<BeritaUpdatePage />}/>
        <Route path="/admin/login"/>
        <Route path="/tes" element={<Tes />} />
      </Routes>
    </div>
  );
};

export default App;