//import dotenv from 'dotenv';
//import express from 'express';
//import mongoose from 'mongoose';
//import cors from 'cors';
//import path from 'path';
//import { fileURLToPath } from 'url';
//import songRoutes from './routes/songs.js';
//import playlistRoutes from './routes/playlists.js';

//dotenv.config();

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//const app = express();
//const PORT = process.env.PORT || 5000;

//// Middleware
//app.use(cors());
//app.use(express.json());

//// Serve static files for uploaded audio/images
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//// Database Connection
//mongoose.connect(process.env.MONGODB_URI)
//    .then(() => console.log('Connected to MongoDB'))
//    .catch((err) => console.error('Error connecting to MongoDB:', err));

//// Basic Route
//app.get('/', (req, res) => {
//    res.send('Music World API is running');
//});

//// API Routes
//app.use('/api/songs', songRoutes);
//app.use('/api/playlists', playlistRoutes);

//// Start Server
//app.listen(PORT, () => {
//    console.log(`Server is running on port ${PORT}`);
//});


import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import songRoutes from "../routes/songs.js";
import playlistRoutes from "../routes/playlists.js";

dotenv.config();

const app = express();

// Fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// MongoDB connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false
    }).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

await connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Music API running");
});

app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);

export default app;