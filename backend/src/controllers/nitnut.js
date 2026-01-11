export const createNews = async (req, res) => {
  try {
    let thumbnailUrl = null;
    let thumbnailId = null;

    // jika ada file dari multer
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      thumbnailUrl = result.secure_url;
      thumbnailId = result.public_id;
    }

    // simpan ke MongoDB (contoh tanpa model, hanya JSON response)
    const news = {
      title: req.body.title,
      content: req.body.content,
      thumbnailUrl,
      thumbnailId
    };

    // misalnya langsung kirim balik ke client
    res.status(200).json({
      success: true,
      message: "News created",
      data: news
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error creating news"
    });
  }
};