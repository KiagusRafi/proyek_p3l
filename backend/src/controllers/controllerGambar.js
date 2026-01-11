import Gambar from "../models/Gambar.js";
import cloudinary from "../utils/cloudinary.js";

export const getGambar = async (_, res) => {
    try {
        const gambar = await Gambar.find().sort({createdAt:-1}); 
        res.status(200).json(gambar);
    } catch (error) {
        console.error("Error in getGambar controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}
export const getGambarByProperty = async (req, res) => {
  try {
    const { key, value } = req.query; 
    if (!key || !value) {
      return res.status(400).json({ error: "Key dan value harus disediakan" });
    }

    // cari semua dokumen sesuai kriteria
    const gambarList = await Gambar.find({ [key]: value });

    // selalu return array, meskipun kosong
    return res.status(200).json(gambarList);
  } catch (err) {
    console.error("Error getGambarByProperty:", err);
    return res.status(500).json({ error: err.message });
  }
}


export const deleteGambar = async (req, res) => {
    try {
        const deletedGambar = await Gambar.findByIdAndDelete(req.params.id);
        if(!deletedGambar) return res.status(404).json({message: "Gambar not found"});
        res.status(200).json({message:"Gambar deleted successfully"});
    } catch (error) {
        console.error("Error in deleteGambar controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}
export const uploadGambar = async (req, res) => {
    try {
        const {untuk} = req.body;

        // cek metadata
        let metadata = {};
        if (req.body.metadata) {
            try {
                metadata = JSON.parse(req.body.metadata); // parse string JSON jadi objek
            } catch (err) {
                console.log("metadata tidak valid: ", err)
                metadata = {}; // fallback kalau parsing gagal
            }
        }

        let dataGambar = {untuk, metadata};

        // pastikan ada file dari multer
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }
        // upload ke Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        dataGambar.url = result.secure_url;
        dataGambar.picId = result.public_id;

        // buat objek + simpen mongodb
        const newGambar = new Gambar({...dataGambar})
        await newGambar.save();

        res.status(200).json({
            success: true,
            message: "Image uploaded.",
            data: newGambar   // berisi secure_url, public_id, dll
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
        success: false,
        message: "Error uploading image"
        });
    }
}
