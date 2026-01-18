// server/routes/auth.js
import express from "express";

import auth from "../middleware/auth.js";
import { register, login, logout, refresh } from "../controllers/controllerAuth.js"

const router = express.Router();

// Register Route ga kepake.
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', auth, refresh);

export default router;