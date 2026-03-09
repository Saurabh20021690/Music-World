import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    album: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    audioUrl: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, // duration in seconds
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

export default mongoose.model('Song', songSchema);
