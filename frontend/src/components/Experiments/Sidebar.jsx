import { useState, useEffect } from "react";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      {/* Tombol toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 m-2 bg-blue-500 text-white rounded"
      >
        {open ? "Tutup" : "Menu"}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-red shadow-lg transform transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Panel Navigasi</h2>
        </div>
        <nav className="p-4 space-y-2">

          <a href="/" className="block p-2 rounded hover:bg-gray-100">
            Home
          </a>
          <a href="/admin" className="block p-2 rounded hover:bg-gray-100">
            Admin
          </a>
          <a href="/berita" className="block p-2 rounded hover:bg-gray-100">
            Berita
          </a>
        </nav>
      </div>
    </div>
  );
};