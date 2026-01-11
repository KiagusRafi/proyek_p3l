import { useState } from 'react';
import React from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

import api from '../../lib/axios';
import SectionHeader from '../../components/SectionHeader';
import { X } from 'lucide-react';

const CreateBeritaPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(""); // untuk menampilkan preview
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // buat URL sementara untuk preview
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title dan content wajib diisi");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("image", file);

    try {
      setLoading(true);
      const res = await api.post("/sdncs1/admin/berita", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("berhasil membuat berita")
      navigate("/admin")
      // alert(res.data.message);
    } catch (error) {
      console.error("Error creating berita:", error);
      toast.error("gagal membuat berita")
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className='bg-[#f2f2f2]'>
    <SectionHeader text="Buat berita baru"/>
        <div className='flex m-4 w-[100%] justify-center'>
        <Link to="/admin" className='flex items-center justify-center btn btn-square bg-gray-300 p-4 hover:bg-red-500 w-fit h-fit rounded-3xl'><X className='w-8 h-8'/></Link>
        </div>
    <form onSubmit={handleSubmit} className="p-4 space-y-4 justify-self-center w-[67vw]">
        <SectionHeader text="Judul" justify='start'/>
      <input
        type="text"
        placeholder="Judul berita"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full"
        />
        <SectionHeader text="Konten" justify='start'/>
      <textarea
        placeholder="Isi berita"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textarea textarea-bordered w-full h-[35vh]"
        />

        {preview && (
            <div className="mt-4">
            <p>Preview Thumbnail:</p>
            <img
                src={preview}
                alt="Preview"
                className="mt-2 w-48 h-48 object-cover rounded"
            />
            </div>
        )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full"
      />


      <button type="submit" className="btn btn-primary w-[100%] p-4" disabled={loading}>
        {loading ? "Mengirim..." : "Buat"}
      </button>
    </form>
    </div>
  );
}

export default CreateBeritaPage