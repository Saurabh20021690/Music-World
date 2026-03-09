import React, { useContext } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Mic2, ListMusic, MonitorSpeaker } from 'lucide-react';
import { PlayerContext } from '../context/PlayerContext';
import './Player.css';

const Player = () => {
    const { currentSong, isPlaying, progress, duration, volume, togglePlay, handleSeek, handleVolume } = useContext(PlayerContext);

    const formatTime = (time) => {
        if (!time || isNaN(time)) return '0:00';
        const min = Math.floor(time / 60);
        const sec = Math.floor(time % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    const calculateProgress = () => {
        if (!duration || !progress) return 0;
        return (progress / duration) * 100;
    };

    const handleProgressClick = (e) => {
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        handleSeek(percent * duration);
    };

    const handleVolumeClick = (e) => {
        const bar = e.currentTarget;
        const rect = bar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        handleVolume(Math.max(0, Math.min(1, percent)));
    };

    if (!currentSong) {
        return (
            <div className="player">
                <div className="player-left"></div>
                <div className="player-center">
                    <p className="text-subdued" style={{ fontSize: '13px' }}>Select a song to play</p>
                </div>
                <div className="player-right"></div>
            </div>
        );
    }

    return (
        <div className="player">

            {/* Current Track Info */}
            <div className="player-left">
                <img
                    src={currentSong.coverImage.startsWith('http') ? currentSong.coverImage : ` https://music-world-taupe.vercel.app${currentSong.coverImage}`}
                    alt="Album Cover"
                    className="current-track-img"
                />
                <div className="current-track-info">
                    <a href="#" className="track-title">{currentSong.title}</a>
                    <a href="#" className="track-artist">{currentSong.artist}</a>
                </div>
            </div>

            {/* Main Controls & Progress */}
            <div className="player-center">
                <div className="player-controls">
                    <button className="control-btn tooltip-container" aria-label="Enable shuffle">
                        <Shuffle size={16} />
                    </button>
                    <button className="control-btn" aria-label="Previous">
                        <SkipBack size={20} />
                    </button>

                    <button className="play-pause-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="play-icon-offset" />}
                    </button>

                    <button className="control-btn" aria-label="Next">
                        <SkipForward size={20} />
                    </button>
                    <button className="control-btn tooltip-container" aria-label="Enable repeat">
                        <Repeat size={16} />
                    </button>
                </div>

                <div className="playback-bar">
                    <span className="time-text">{formatTime(progress)}</span>
                    <div className="progress-container" onClick={handleProgressClick}>
                        <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width: `${calculateProgress()}%` }}></div>
                            <div className="progress-bar-handle" style={{ left: `${calculateProgress()}%` }}></div>
                        </div>
                    </div>
                    <span className="time-text">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Extra Controls & Volume */}
            <div className="player-right">
                <button className="control-btn tooltip-container" aria-label="Now playing view">
                    <Mic2 size={16} />
                </button>
                <button className="control-btn tooltip-container" aria-label="Queue">
                    <ListMusic size={16} />
                </button>
                <button className="control-btn tooltip-container" aria-label="Connect to a device">
                    <MonitorSpeaker size={16} />
                </button>

                <div className="volume-control">
                    <button className="control-btn tooltip-container" aria-label="Mute" onClick={() => handleVolume(volume === 0 ? 1 : 0)}>
                        <Volume2 size={16} />
                    </button>
                    <div className="progress-container volume-bar" onClick={handleVolumeClick}>
                        <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width: `${Math.round(volume * 100)}%` }}></div>
                            <div className="progress-bar-handle" style={{ left: `${Math.round(volume * 100)}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Player;
