import React, { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const CreateBerita = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(""); // untuk menampilkan preview
  const [loading, setLoading] = useState(false);

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
      // alert(res.data.message);
    } catch (error) {
      console.error("Error creating berita:", error);
      toast.error("gagal membuat berita")
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <input
        type="text"
        placeholder="Judul berita"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full"
      />

      <textarea
        placeholder="Isi berita"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textarea textarea-bordered w-full h-32"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full"
      />

      {/* Preview gambar */}
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

      <button type="submit" className="btn btn-primary w-fit p-4" disabled={loading}>
        {loading ? "Mengirim..." : "Buat"}
      </button>
    </form>
  );
};

export default CreateBerita;