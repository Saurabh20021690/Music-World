import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";

const API = "http://localhost:5000";

const PlaylistPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const { playSong, setQueue } = useContext(PlayerContext);

  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    loadPlaylist();

    axios
      .get(`${API}/api/songs`)
      .then((res) => setSongs(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const loadPlaylist = () => {
    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    const found = playlists.find((p) => p.id === Number(id));
    setPlaylist(found);
  };

  const prepareSong = (song) => {
    return {
      ...song,
      audio: song.audio?.startsWith("http")
        ? song.audio
        : `${API}${song.audio}`,
      coverImage: song.coverImage?.startsWith("http")
        ? song.coverImage
        : `${API}${song.coverImage}`
    };
  };

  const handlePlaySong = (song) => {
    const queue = playlist.songs.map(prepareSong);
    setQueue(queue);
    playSong(prepareSong(song));
  };

  const playPlaylist = () => {
    if (!playlist?.songs.length) return;

    const queue = playlist.songs.map(prepareSong);

    setQueue(queue);
    playSong(queue[0]);
  };

  const addSong = (song) => {

    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];

    const updated = playlists.map((p) => {

      if (p.id === Number(id)) {

        const exists = p.songs.find((s) => s._id === song._id);

        if (!exists) p.songs.push(song);

      }

      return p;

    });

    localStorage.setItem("playlists", JSON.stringify(updated));

    loadPlaylist();
  };

  const removeSong = (songId) => {

    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];

    const updated = playlists.map((p) => {

      if (p.id === Number(id)) {

        p.songs = p.songs.filter((s) => s._id !== songId);

      }

      return p;

    });

    localStorage.setItem("playlists", JSON.stringify(updated));

    loadPlaylist();
  };

  if (!playlist) return null;

  return (

    <>
      {/* Overlay */}
      <div
        onClick={() => navigate(-1)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(4px)",
          zIndex: 999
        }}
      />

      {/* Dialog Panel */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          maxHeight: "80vh",
          overflowY: "auto",
          background: "#121212",
          borderRadius: "12px",
          padding: "30px",
          zIndex: 1000,
          color: "white",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
        }}
      >

        {/* Close */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            color: "white",
            cursor: "pointer"
          }}
        >
          ✕
        </button>

        {/* HEADER */}

        <div style={{ display: "flex", gap: "25px", marginBottom: "30px" }}>

          <div
            style={{
              width: "160px",
              height: "160px",
              background: "linear-gradient(135deg,#450af5,#c4efd9)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "60px"
            }}
          >
            🎵
          </div>

          <div>

            <p style={{ color: "#b3b3b3" }}>Playlist</p>

            <h1 style={{ fontSize: "40px", margin: "10px 0" }}>
              {playlist.name}
            </h1>

            <p style={{ color: "#b3b3b3" }}>
              {playlist.songs.length} songs
            </p>

            <button
              onClick={playPlaylist}
              style={{
                marginTop: "15px",
                background: "#1db954",
                border: "none",
                padding: "10px 25px",
                borderRadius: "30px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              ▶ Play Playlist
            </button>

          </div>

        </div>

        {/* PLAYLIST SONGS */}

        <h3>Playlist Songs</h3>

        {playlist.songs.map((song, index) => (

          <div
            key={song._id}
            onClick={() => handlePlaySong(song)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderRadius: "6px",
              marginTop: "10px",
              background: "#181818",
              cursor: "pointer"
            }}
          >

            <div style={{ width: "30px" }}>{index + 1}</div>

            <img
              src={
                song.coverImage
                  ? song.coverImage.startsWith("http")
                    ? song.coverImage
                    : `${API}${song.coverImage}`
                  : "https://via.placeholder.com/50"
              }
              alt=""
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "4px",
                marginRight: "15px"
              }}
            />

            <div style={{ flex: 1 }}>
              <div>{song.title}</div>
              <div style={{ fontSize: "14px", color: "#b3b3b3" }}>
                {song.artist}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                removeSong(song._id);
              }}
              style={{
                background: "red",
                border: "none",
                padding: "6px 12px",
                borderRadius: "20px",
                cursor: "pointer"
              }}
            >
              Remove
            </button>

          </div>

        ))}

        {/* ADD SONG */}

        <div style={{ marginTop: "40px" }}>

          <h3>Add Songs</h3>

          {songs.map((song) => (

            <div
              key={song._id}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                gap: "10px"
              }}
            >

              <span style={{ flex: 1 }}>
                {song.title} - {song.artist}
              </span>

              <button
                onClick={() => addSong(song)}
                style={{
                  background: "#1db954",
                  border: "none",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  cursor: "pointer"
                }}
              >
                Add
              </button>

            </div>

          ))}

        </div>

      </div>
    </>
  );

};

export default PlaylistPage;