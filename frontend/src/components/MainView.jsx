import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TopBar from './TopBar';
import Card from './Card';
import { PlayerContext } from '../context/PlayerContext';
import './MainView.css';

const MainView = () => {

    const [greeting, setGreeting] = useState('Good evening');
    const [songs, setSongs] = useState([]);
    const [showAllMadeForYou, setShowAllMadeForYou] = useState(false);
    const [showAllRecent, setShowAllRecent] = useState(false);

    const { playSong } = useContext(PlayerContext);

    useEffect(() => {

        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');

        axios.get('http://localhost:5000/api/songs')
            .then(res => setSongs(res.data))
            .catch(err => console.error("Error fetching songs:", err));

    }, []);

    return (

        <div className="main-view">

            <div className="main-view-bg"></div>

            <div className="main-content">

                {/* Greeting */}
                <section className="greeting-section">
              

                    <h2 className="greeting">{greeting}</h2>
                       
                    <div className="quick-picks-grid">
                        {[1,2,3,4,5,6].map((item) => (
                            <div key={item} className="quick-pick-item">
                                <img
                                    src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=100&auto=format&fit=crop"
                                    alt="Mix"
                                />
                                <span className="quick-pick-title">
                                    Daily Mix {item}
                                </span>
                            </div>
                        ))}
                    </div>

                </section>

                {/* Made For You */}

                <section className="shelf-section">

                    <div className="shelf-header">

                        <h3>Made For You</h3>

                        <button
                            className="show-all text-subdued"
                            onClick={() => setShowAllMadeForYou(!showAllMadeForYou)}
                        >
                            {showAllMadeForYou ? "Show Less" : "Show All"}
                        </button>

                    </div>

                    <div className="card-grid">

                        {(showAllMadeForYou ? songs : songs.slice(0,5)).map(song => (
                           
                            <Card
                                key={song._id}
                                title={song.title}
                                description={song.artist}
                                imageUrl={
                                    song.coverImage.startsWith('http')
                                        ? song.coverImage
                                        : `http://localhost:5000${song.coverImage}`
                                }
                                onPlay={() => playSong(song)}
                            />

                        ))}

                    </div>

                </section>



                {/* Recently Played */}

                <section className="shelf-section">

                    <div className="shelf-header">

                        <h3>Recently Played</h3>

                        <button
                            className="show-all text-subdued"
                            onClick={() => setShowAllRecent(!showAllRecent)}
                        >
                            {showAllRecent ? "Show Less" : "Show All"}
                        </button>

                    </div>

                    <div className="card-grid">

                        {(showAllRecent ? songs : songs.slice(0,5)).map(song => (

                            <Card
                                key={song._id}
                                title={song.title}
                                description={song.artist}
                                imageUrl={
                                    song.coverImage.startsWith('http')
                                        ? song.coverImage
                                        : `http://localhost:5000${song.coverImage}`
                                }
                                onPlay={() => playSong(song)}
                            />

                        ))}

                    </div>

                </section>

            </div>

        </div>

    );
};

export default MainView;