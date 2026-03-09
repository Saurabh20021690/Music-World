import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Search } from "lucide-react";
import { PlayerContext } from "../context/PlayerContext";

const SearchPage = () => {

  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const { playSong } = useContext(PlayerContext);

  const categories = [
    { name: "Podcasts", color: "#e13300" },
    { name: "Live Events", color: "#7358ff" },
    { name: "Made For You", color: "#1db954" },
    { name: "New Releases", color: "#e8115b" },
    { name: "Pop", color: "#ff4632" },
    { name: "Hip-Hop", color: "#af2896" },
    { name: "Rock", color: "#477d95" },
    { name: "Charts", color: "#ba5d07" }
  ];

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/songs")
      .then(res => setSongs(res.data))
      .catch(err => console.log(err));

  }, []);

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div style={{ padding: "30px", color: "white" }}>

      {/* SEARCH BAR */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "white",
          borderRadius: "30px",
          padding: "10px 20px",
          maxWidth: "500px",
          marginBottom: "30px"
        }}
      >

        <Search color="black" />

        <input
          type="text"
          placeholder="What do you want to listen to?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            marginLeft: "10px",
            width: "100%",
            fontSize: "16px"
          }}
        />

      </div>


      {/* SEARCH RESULTS */}

      {search && (

        <>
          <h2 style={{ marginBottom: "20px" }}>Songs</h2>

          {filteredSongs.length === 0 && (
            <p style={{ color: "#b3b3b3" }}>
              No songs found
            </p>
          )}

          {filteredSongs.map(song => (

            <div
              key={song._id}
              onClick={() => playSong(song)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                padding: "10px",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "0.2s"
              }}

              onMouseEnter={(e)=>{
                e.currentTarget.style.background="#1a1a1a"
              }}

              onMouseLeave={(e)=>{
                e.currentTarget.style.background="transparent"
              }}

            >

              <img
                src={
                  song.coverImage.startsWith("http")
                    ? song.coverImage
                    : `http://localhost:5000${song.coverImage}`
                }
                alt=""
                width="50"
                height="50"
                style={{ borderRadius: "4px" }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "600" }}>
                  {song.title}
                </div>

                <div style={{ color: "#b3b3b3", fontSize: "14px" }}>
                  {song.artist}
                </div>
              </div>

              <div style={{ color: "#1db954" }}>
                ▶
              </div>

            </div>

          ))}

        </>

      )}


      {/* BROWSE CATEGORIES */}

      {!search && (

        <>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "20px"
            }}
          >
            Browse all
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
              gap: "20px"
            }}
          >

            {categories.map((cat, i) => (

              <div
                key={i}
                style={{
                  background: cat.color,
                  height: "160px",
                  borderRadius: "10px",
                  padding: "20px",
                  fontSize: "22px",
                  fontWeight: "700",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "0.3s"
                }}

                onMouseEnter={(e)=>{
                  e.currentTarget.style.transform="scale(1.05)"
                }}

                onMouseLeave={(e)=>{
                  e.currentTarget.style.transform="scale(1)"
                }}

              >
                {cat.name}
              </div>

            ))}

          </div>

        </>

      )}

    </div>
  );
};

export default SearchPage;