
import BeritaList from '../components/BeritaList.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import Hero from '../components/Hero.jsx';
import Header from '../components/Header.jsx';
import UploadGambar from '../components/UploadGambar.jsx'


const HomePage = () => {
  return (
    <div className='justify-center align-center'>
      <Header/>
      <Hero/>
      <SectionHeader text="Berita"/>
      <div className='bg-[#f2f2f2] p-8 px-[13%]'>
        <BeritaList to="/berita"/>
      </div>

    </div>
  )
}

export default HomePage;