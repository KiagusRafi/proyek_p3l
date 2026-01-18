import express from "express";

import { getAllBerita, getBeritaById, createBerita, updateBerita, deleteBerita } from "../controllers/controllerBerita.js";
import { getGambar, deleteGambar, uploadGambar, getGambarByProperty } from "../controllers/controllerGambar.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//user
router.get("/", getAllBerita);
router.get("/berita/:id", getBeritaById);

//admin
router.get("/admin/berita",auth, getAllBerita);
router.get("/admin/berita/:id",auth,  getBeritaById);
router.post("/admin/berita",auth, upload.single('image'), createBerita);
router.put("/admin/berita/:id",auth, upload.single('image'),updateBerita);
router.delete("/admin/berita/:id",auth,  deleteBerita);

// router.post("/admin/misc", upload.single('image'), uploadGambar);

//misc
router.get("/gambar", getGambar);
router.get("/admin/gambar/search", getGambarByProperty);
router.post("/admin/gambar", upload.single("image"), uploadGambar);
router.delete("/admin/gambar/:id", deleteGambar);

export default router;