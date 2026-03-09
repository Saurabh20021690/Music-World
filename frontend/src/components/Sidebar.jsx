import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Library, Plus, ArrowRight } from "lucide-react";
import "./Sidebar.css";

const Sidebar = () => {

  const location = useLocation();

  const [playlists, setPlaylists] = useState([]);

  /* Load playlists from localStorage */
  useEffect(() => {

    const storedPlaylists =
      JSON.parse(localStorage.getItem("playlists")) || [];

    setPlaylists(storedPlaylists);

  }, []);

  /* Create Playlist */
  const createPlaylist = () => {

    const name = prompt("Enter playlist name");

    if (!name) return;

    const newPlaylist = {
      id: Date.now(),
      name,
      songs: []
    };

    const updatedPlaylists = [...playlists, newPlaylist];

    setPlaylists(updatedPlaylists);

    localStorage.setItem(
      "playlists",
      JSON.stringify(updatedPlaylists)
    );
  };

  return (

    <div className="sidebar">

      {/* TOP NAVIGATION */}
      <div className="sidebar-panel nav-panel">

        <ul className="nav-links">

          <li>
            <Link
              to="/"
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Home size={22} />
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link
              to="/search"
              className={`nav-item ${
                location.pathname === "/search" ? "active" : ""
              }`}
            >
              <Search size={22} />
              <span>Search</span>
            </Link>
          </li>

        </ul>

      </div>


      {/* LIBRARY PANEL */}
      <div className="sidebar-panel library-panel">

        {/* Library Header */}
        <div className="library-header">

          <div className="library-title">
            <Library size={22} />
            <span>Your Library</span>
          </div>

          <div className="library-actions">

            <button
              className="icon-btn"
              onClick={createPlaylist}
              title="Create Playlist"
            >
              <Plus size={20} />
            </button>

            <button
              className="icon-btn"
              title="More"
            >
              <ArrowRight size={20} />
            </button>

          </div>

        </div>


        {/* Library Content */}
        <div className="library-content">

          {playlists.length === 0 ? (

            <div className="empty-library">

              <h4>Create your first playlist</h4>

              <p>It's easy, we'll help you</p>

              <button
                className="create-playlist-btn"
                onClick={createPlaylist}
              >
                Create Playlist
              </button>

            </div>

          ) : (

            <div className="playlist-list">

              {playlists.map((playlist) => (

                <Link
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className={`playlist-item ${
                    location.pathname === `/playlist/${playlist.id}`
                      ? "active-playlist"
                      : ""
                  }`}
                >
                  🎵 {playlist.name}
                </Link>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Sidebar;