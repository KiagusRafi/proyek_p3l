const ProfilTable = () => {
  const data = {
    namaSekolah: "SDN Cipete Selatan 01",
    npsn: 20105851,
    statusSekolah: "Negeri",
    akreditasiSekolah: "A (Sangat Baik)",
    kepemilikan: "Pemda DKI Jakarta",
    alamat: "Jl. Asem Dua No. 37",
  };

  const rows = [
    { label: "Nama Sekolah", value: data.namaSekolah },
    { label: "NPSN", value: data.npsn },
    { label: "Status Sekolah", value: data.statusSekolah },
    { label: "Akreditasi", value: data.akreditasiSekolah },
    { label: "Kepemilikan", value: data.kepemilikan },
    { label: "Alamat", value: data.alamat },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f2f2f2] px-4">
      <div className="w-3/4 space-y-4 text-[32px] md:text-[40px]">
        {rows.map((row, i) => (
          <div
            key={i}
            className="bg-[#ff9a9a] grid grid-cols-[250px_1fr] gap-x-12 p-4 rounded-lg items-center"
          >
            <div className="font-semibold">{row.label} :</div>
            <div>{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilTable;