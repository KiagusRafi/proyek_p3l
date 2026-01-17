// server/routes/auth.js
import express from "express";

const router = express.Router();

import { register, login } from "../controllers/controllerAuth.js"

// Register Route ga kepake.
router.post('/register', register);
router.post('/login', login);

export default router;