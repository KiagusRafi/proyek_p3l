import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../models/User.js"
import config from '../config/config.js'; // Perhatikan penambahan ekstensi .js

export const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        // let user = await User.findOne({ username });
        let user = await User.exists({});
        if (user) return res.status(400).json({ msg: 'seorang admin sudah terdaftar' });

        user = new User({ username, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        res.json({ msg: 'Registrasi berhasil' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'Username/Password salah' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Username/Password salah' });

        // Setiap login baru, buat sessionId baru untuk menendang user lama
        const newSessionId = Date.now().toString();
        user.currentSessionId = newSessionId;
        await user.save();

        const payload = { user: { id: user.id, sessionId: newSessionId } };

        jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {
                httpOnly: true,
                secure: false, // Set true jika HTTPS
                sameSite: 'Lax',
                maxAge: 3600000 
            }).json({ msg: 'Login berhasil', username: user.username });
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// LOGOUT
export const logout = (req, res) => {
    res.clearCookie('token');
    res.json({ msg: 'Berhasil logout' });
};

// @route   GET api/auth/me
// @desc    Cek status autentikasi user saat refresh halaman
// @access  Private (Menggunakan middleware auth)
export const refresh = async (req, res) => {
    try {
        // Ambil data user dari database berdasarkan ID di token (sudah di-decode oleh middleware)
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
