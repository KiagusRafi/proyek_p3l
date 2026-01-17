import Berita from "../models/Berita.js";
import Gambar from "../models/Gambar.js";
import cloudinary from "../config/cloudinary.js";

export async function getAllBerita(_, res){
    try {
        const berita = await Berita.find().sort({createdAt:-1}); 
        res.status(200).json(berita);
    } catch (error) {
        console.error("Error in getAllBerita controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getBeritaById = async (req, res) => {
    try {
        const berita = await Berita.findById(req.params.id);
        if(!berita) return res.status(404).json({message: "Berita not found"});
        res.status(200).json(berita);
    } catch (error) {
        console.error("Error in getBeritaById controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const createBerita = async (req, res) => {
    try {
        const {title,content} = req.body;
        let dataBerita = { title, content };
        let dataGambar = {untuk: "thumbnail", metadata:{}}

        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.path);
                dataGambar.url = result.secure_url;
                dataGambar.picId = result.public_id;

                const gambar = new Gambar({...dataGambar});
                
                const createdGambar = await gambar.save()
                    .then(doc => console.log("Gambar tersimpan:", doc))
                    .catch(err => console.error("Error simpan gambar:", err));

                
                dataBerita.thumbnailUrl = result.secure_url;
                dataBerita.thumbnailId = result.public_id;
            } catch (error) {
                console.error("Thumbnail gagal di-upload.",error)
            }
        }

        const newBerita = new Berita({...dataBerita});
        await newBerita.save();
        res.status(201).json({message: "Berita created successfully"});
    } catch (error) {
        console.error("Error in createBerita controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const updateBerita = async (req, res) => {
  try {
    const { title, content } = req.body;
    let updateData = { title, content };

    if (req.file) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path);

            const gambar = new Gambar({
                untuk: "thumbnail", 
                url:result.secure_url, 
                picId:result.public_id
            })
            await gambar.save();

            updateData.thumbnailUrl = result.secure_url;
            updateData.thumbnailId = result.public_id;
        } catch (error) {
            console.error("Thumbnail gagal di-upload.")
        }
    }

    const updatedBerita = await Berita.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedBerita) return res.status(404).json({ message: "Berita not found" });

    res.status(200).json({ updatedBerita });
  } catch (error) {
    console.error("Error in updateBerita controller", error);
    res.status(500).json({ message: "Internal server error" });
  }

};

export const deleteBerita = async (req, res) => {
    try {
        const deletedBerita = await Berita.findByIdAndDelete(req.params.id);
        if(!deletedBerita) return res.status(404).json({message: "Berita not found"});
        res.status(200).json({message:"Berita deleted successfully"});
    } catch (error) {
        console.error("Error in deleteBerita controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

// export const uploadGambar = async (req, res) => {
//     try {
//         // pastikan ada file dari multer
//         if (!req.file) {
//         return res.status(400).json({
//             success: false,
//             message: "No file uploaded"
//         });
//         }

//         // upload ke Cloudinary
//         const result = await cloudinary.uploader.upload(req.file.path);

//         // kirim response ke client
//         res.status(200).json({
//             success: true,
//             message: "thumbnail uploaded.",
//             data: result   // berisi secure_url, public_id, dll
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//         success: false,
//         message: "Error uploading image"
//         });
//     }
// };



