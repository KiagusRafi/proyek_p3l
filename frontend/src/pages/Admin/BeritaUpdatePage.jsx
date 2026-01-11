import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';

import api from '../../lib/axios';
import SectionHeader from '../../components/SectionHeader';
import { X } from 'lucide-react';

const BeritaUpdatePage = () => {
  const [berita, setBerita] = useState({
    title:"",
    content:"",
    thumbnailUrl:"",
    thumbnailId:""
  })
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true)
  const [saving,setSaving] = useState(false)
  const [preview, setPreview] = useState("")

  const navigate = useNavigate()

  const { id } = useParams(); //ngambil parameter bernama :id dari url

    useEffect(()=> {
        const fetchBerita = async () => {
        try {
            const res = await api.get(`/sdncs1/admin/berita/${id}`)
            setBerita(res.data);
            // console.log(res.data);
        } catch (error) {
            console.log("Error fetching news",error)
            toast.error("Failed to load news")
        } finally {
            setLoading(false);
        }
        }     
        fetchBerita();
    }, [id]);

  //handler
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

    if (!berita.title.trim()|| !berita.content.trim()){
      toast.error("Please add a title or content")
      return;
    }

    setSaving(true)

    const formData = new FormData();
    formData.append("title", berita.title);
    formData.append("content", berita.content);

    if (file) {
      formData.append("image", file); // field harus sama dengan upload.single('image')
    }

    try {
        setLoading(true)
      await api.put(`/sdncs1/admin/berita/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      navigate("/admin")
    } catch (error) {
      console.log("Error saving the news: ",error);
      toast.error("Failed to update news");
    } finally {
        setLoading(false)
      setSaving(false)
    }
  };
  // loading state
  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className="animate-spin size-10"/>
        <span>Loading...</span>
      </div>
    );
  }

  return (
      <div className='bg-[#f2f2f2]'>
    <SectionHeader text="Edit berita"/>
        <div className='flex m-4 w-[100%] justify-center'>
        <Link to="/admin" className='flex items-center justify-center btn btn-square bg-gray-300 p-4 hover:bg-red-500 w-fit h-fit rounded-3xl'><X className='w-8 h-8'/></Link>
        </div>
    <form onSubmit={handleSubmit} disabled={saving} className="p-4 space-y-4 justify-self-center w-[67vw]">
        <SectionHeader text="Judul" justify='start'/>
      <input
        type="text"
        placeholder="Judul berita"
        value={berita.title}
        onChange={(e) => setBerita({ ...berita, title: e.target.value })}
        className="input input-bordered w-full"
        />
        <SectionHeader text="Konten" justify='start'/>
      <textarea
        placeholder="Isi berita"
        value={berita.content}
        onChange={(e) => setBerita({ ...berita, content: e.target.value })}
        className="textarea textarea-bordered w-full h-[35vh]"
        />

        {preview && (
            <div className="mt-4">
            <p>Preview Thumbnail:</p>
            <img
                src={preview}
                alt="Preview"
                onChange={(e) => {setFile(e.target.files[0])}}
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
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
    </div>
  );

  
}

export default BeritaUpdatePage