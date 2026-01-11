import React from 'react'

const MisiCard = () => {
  const items = [
    "Membangun lingkungan satuan pendidikan yang membentuk murid memiliki akhlak mulia melalui rutinitas kegiatan keagamaan dan menerapkan ajaran agama melalui cara berinteraksi di satuan pendidikan.",
    "Membangun lingkungan satuan pendidikan yang bertoleransi dalam kebhinekaan global, mencintai budaya lokal, dan menjunjung nilai gotong royong.",
    "Mengembangkan dan memfasilitasi peningkatan prestasi murid sesuai minat dan bakatnya melalui proses pendampingan dan kerjasama dengan orang tua.",
    "Mengembangkan kemandirian, nalar kritis, dan kreativitas yang memfasilitasi keragaman minat dan bakat murid.",
  ];

  return (
    <div className="bg-[#f2f2f2] flex flex-col items-center justify-center px-4 py-8 space-y-6">
      {items.map((text, i) => (
        <div
          key={i}
          className="bg-green-300 text-black text-lg md:text-xl p-6 rounded-xl shadow-md max-w-[75%] w-full font-semibold"
        >
          {text}
        </div>
      ))}
    </div>
  );
};


export default MisiCard