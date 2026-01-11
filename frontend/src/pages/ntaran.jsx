<div className="max-w-lg mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Form Berita</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Judul */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul
          </label>
          <input
            type="text"
            value={berita.title}
            onChange={(e) => setBerita({ ...berita, title: e.target.value })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan judul berita"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            value={berita.content}
            onChange={(e) => setBerita({ ...berita, content: e.target.value })}
            className="w-full border rounded px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan isi berita"
            required
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBerita({ ...berita, content: e.target.value })}
            className="block w-full text-sm text-gray-500 
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={saving} 
          onClick={handleSubmit}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>