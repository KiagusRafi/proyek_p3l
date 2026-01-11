import mongoose from "mongoose";

const gambarSchema = new mongoose.Schema(
    {
        url: {
            type:String,
            required:true
        },
        picId: {
            type:String,
            required:true
        },
        untuk: {
            type:String,
            default:"ndaktawuk"
        },
        metadata:{
            type : mongoose.Schema.Types.Mixed,
            required:false
        }
    },
    {timestamps: true}
);

const Gambar = mongoose.model("Gambar", gambarSchema);

export default Gambar;