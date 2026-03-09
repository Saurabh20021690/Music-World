import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "../components/Card";
import { PlayerContext } from "../context/PlayerContext";

const AllSongs = () => {

  const [songs, setSongs] = useState([]);
  const { playSong } = useContext(PlayerContext);

  useEffect(() => {

    axios.get("http://localhost:5000/api/songs")
      .then(res => setSongs(res.data))
      .catch(err => console.log(err));

  }, []);

  return (

    <div style={{
      padding: "40px",
      color: "white",
      background: "#121212",
      minHeight: "100vh"
    }}>

      <h1 style={{
        fontSize: "32px",
        fontWeight: "700"
      }}>
        All Songs
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))",
        gap: "24px",
        marginTop: "30px"
      }}>

        {songs.map(song => (

          <Card
            key={song._id}
            title={song.title}
            description={song.artist}
            imageUrl={
              song.coverImage.startsWith("http")
                ? song.coverImage
                : `http://localhost:5000${song.coverImage}`
            }
            onPlay={() => playSong(song)}
          />

        ))}

      </div>

    </div>
  );
};

export default AllSongs;