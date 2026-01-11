import React from 'react'

import Header from '../components/Header'
import SectionHeader from '../components/SectionHeader'
import MisiCard from '../components/MisiCard'
import ProfilTable from '../components/ProfilTable'

const ProfilPage = () => {
  return (
    <div>
    <Header/>
    <SectionHeader text="Profil Sekolah"/>
      <ProfilTable/>
      <SectionHeader text="Visi"/>
      <div className="space-y-4 text-[32px] md:text-[40px] text-center mx-auto bg-[#f2f2f2] p-8 px-[13%]">Terwujudnya murid yang mencerminkan 8 profil lulusan :
keimanan dan ketakwaan, kewargaan, penalaran kritis, kreativitas, kolaborasi, kemandirian, kesehatan, dan komunikasi</div>
      <SectionHeader text="Misi"/>
      <MisiCard/>
    </div>
  )
}

export default ProfilPage