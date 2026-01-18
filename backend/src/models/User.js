// server/models/User.js
// and by User we mean Admin.
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    currentSessionId: { type: String, default: null } // Untuk melacak login terakhir
});

const User = mongoose.model('User', UserSchema);

export default User;