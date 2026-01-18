import jwt from "jsonwebtoken"

import config from "../config/config.js"
import User from "../models/User.js"

export default async function(req, res, next) {
    const token = req.cookies.token; // Mengambil token dari cookie

    if (!token) return res.status(401).json({ msg: 'Sesi berakhir, silakan login' });

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        const user = await User.findById(decoded.user.id);

        // LOGIKA TENDANG: Jika ID session di token tidak sama dengan yang di DB
        if (!user || decoded.user.sessionId !== user.currentSessionId) {
            res.clearCookie('token');
            return res.status(401).json({ msg: 'Sesi Anda telah digantikan oleh login baru' });
        }

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token tidak valid' });
    }
};