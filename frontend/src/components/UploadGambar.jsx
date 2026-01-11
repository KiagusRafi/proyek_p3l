import React, { useState } from "react";

const UploadGambar = () => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [untuk, setUntuk] = useState(""); // state untuk input teks

  // handler saat pilih file
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // handler upload
  const handleUpload = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("untuk", untuk); // tambahkan field "untuk"

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert("Upload berhasil: " + JSON.stringify(data));
    } catch (err) {
      console.error("Upload gagal:", err);
      alert("Upload gagal");
    }
  };

  // handler batal
  const handleCancel = () => {
    setFile(null);
    setPreview(null);
    setUntuk(""); // reset input teks juga
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg w-fit">
      {/* input teks untuk */}
      <div className="flex flex-col w-full max-w-xs">
        <label className="mb-1 font-medium">Untuk :</label>
        <input
          type="text"
          value={untuk}
          onChange={(e) => setUntuk(e.target.value)}
          className="input input-bordered"
          placeholder="Masukkan tujuan gambar"
        />
      </div>

      {/* input file */}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="file-input file-input-bordered w-full max-w-xs"
      />

      {/* preview */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-lg border"
        />
      )}

      {/* tombol */}
      <div className="flex gap-2">
        <button
          onClick={handleUpload}
          className="btn btn-primary"
          disabled={!file || !untuk}
        >
          Upload
        </button>
        <button
          onClick={handleCancel}
          className="btn btn-secondary"
        >
          Batal
        </button>
      </div>
    </div>
  );
};

export default UploadGambar;