import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import Admin from './src/models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Admin.deleteMany({}); // Reset admin lama
  
  const hash = await bcrypt.hash("admin123", 10);
  await Admin.create({ password: hash, tokenVersion: 0 });
  
  console.log("Admin dibuat! Password: admin123");
  process.exit();
};

createAdmin();