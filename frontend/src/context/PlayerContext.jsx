import React, { createContext, useState, useRef, useEffect } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        const audio = audioRef.current;

        const setAudioData = () => {
            setDuration(audio.duration);
            setProgress(audio.currentTime);
        };

        const setAudioTime = () => setProgress(audio.currentTime);
        const audioEnd = () => setIsPlaying(false);

        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);
        audio.addEventListener('ended', audioEnd);

        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
            audio.removeEventListener('ended', audioEnd);
        };
    }, []);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play().catch(e => console.error("Playback error", e));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const playSong = (song) => {
        if (currentSong?._id === song._id) {
            setIsPlaying(!isPlaying);
        } else {
            setCurrentSong(song);
            // Construct exact url if needed or just use relative if proxy is setup
            // Assuming backend runs on 5000 and url returned by db starts with /uploads
            //const backendUrl = 'http://localhost:5000';
                 const backendUrl = ' https://music-world-taupe.vercel.app';
           
            const audioSrc = song.audioUrl.startsWith('http') ? song.audioUrl : `${backendUrl}${song.audioUrl}`;
            audioRef.current.src = audioSrc;
            audioRef.current.load();
            setIsPlaying(true);
        }
    };

    const togglePlay = () => {
        if (currentSong) {
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (time) => {
        audioRef.current.currentTime = time;
        setProgress(time);
    };

    const handleVolume = (vol) => {
        setVolume(vol);
    };

    return (
        <PlayerContext.Provider value={{
            currentSong,
            isPlaying,
            progress,
            duration,
            volume,
            playSong,
            togglePlay,
            handleSeek,
            handleVolume
        }}>
            {children}
        </PlayerContext.Provider>
    );
};
