import mongoose from "mongoose";

const beritaSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required:true
        },
        content: {
            type:String,
            required:true
        },
        thumbnailUrl: {
            type:String,
            required:false
        },
        thumbnailId: {
            type:String,
            required:false
        }
    },
    {timestamps: true}
);

const Berita = mongoose.model("Berita", beritaSchema);

export default Berita;