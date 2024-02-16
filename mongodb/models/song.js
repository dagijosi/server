import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    gener: { type: String, required: true },
    
});

const userModel = mongoose.model("User", SongSchema);

export default userModel;