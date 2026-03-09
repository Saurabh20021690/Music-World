import express from 'express';
import Song from '../models/Song.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Get all songs
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single song
router.get('/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ message: 'Song not found' });
        res.json(song);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Upload and create a new song
router.post('/', upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]), async (req, res) => {
    try {
        if (!req.files || !req.files.audio) {
            return res.status(400).json({ message: 'Audio file is required.' });
        }

        const audioFile = req.files.audio[0];
        const imageFile = req.files.coverImage ? req.files.coverImage[0] : null;

        // Use full URL or relative URL based on deployment in the future. For now relative static paths:
        const audioUrl = `/uploads/audio/${audioFile.filename}`;
        const coverImage = imageFile ? `/uploads/images/${imageFile.filename}` : 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop';

        const newSong = new Song({
            title: req.body.title || 'Unknown Title',
            artist: req.body.artist || 'Unknown Artist',
            album: req.body.album || '',
            coverImage: coverImage,
            audioUrl: audioUrl,
            duration: req.body.duration || 0,
        });

        const savedSong = await newSong.save();
        res.status(201).json(savedSong);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Seed some initial data (for demonstration purposes until an admin panel is built)
router.post('/seed', async (req, res) => {
    try {
        const songs = [
            {
                title: "Neon Dreams",
                artist: "Synthwave Explorers",
                album: "Future Past",
                coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop",
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                duration: 372
            },
            {
                title: "Midnight Drive",
                artist: "The Outrunners",
                album: "Night City",
                coverImage: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=500&auto=format&fit=crop",
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                duration: 425
            },
            {
                title: "Electric Sunrise",
                artist: "Dawn Chorus",
                album: "Awakening",
                coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop",
                audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                duration: 320
            }
        ];

        // Clear existing to prevent duplicates on multiple runs
        await Song.deleteMany({});
        const inserted = await Song.insertMany(songs);
        res.status(201).json({ message: "Seed data inserted successfully!", data: inserted });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default router;
