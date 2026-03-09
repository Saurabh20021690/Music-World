import React from "react";
import Dialog from "../components/Dialog";

const Profile = () => {

  const topArtists = [
    "Arijit Singh",
    "Atif Aslam",
    "Neha Kakkar",
    "Ed Sheeran",
    "Taylor Swift"
  ];

  const recentSongs = [
    "Tum Hi Ho",
    "Shape of You",
    "Perfect",
    "Blinding Lights",
    "Kesariya"
  ];

  return (

    <Dialog title="Profile">

      {/* PROFILE HEADER */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
          marginBottom: "40px",
          background: "linear-gradient(180deg,#535353,#121212)",
          padding: "30px",
          borderRadius: "10px"
        }}
      >

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile"
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            boxShadow: "0 4px 60px rgba(0,0,0,.5)"
          }}
        />

        <div>

          <p style={{ fontSize: "14px", color: "#b3b3b3" }}>
            Profile
          </p>

          <h1
            style={{
              fontSize: "42px",
              fontWeight: "900",
              margin: "10px 0"
            }}
          >
            Saurabh Satpute
          </h1>

          <p style={{ color: "#b3b3b3" }}>
            12 Playlists • 45 Followers • 30 Following
          </p>

          <button
            style={{
              marginTop: "20px",
              background: "transparent",
              border: "1px solid #b3b3b3",
              padding: "8px 20px",
              borderRadius: "25px",
              color: "white",
              cursor: "pointer"
            }}
          >
            Edit Profile
          </button>

        </div>

      </div>

      {/* TOP ARTISTS */}

      <h2 style={{ marginBottom: "20px" }}>
        Top Artists This Month
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,150px)",
          gap: "20px",
          marginBottom: "40px"
        }}
      >

        {topArtists.map((artist, index) => (

          <div
            key={index}
            style={{
              background: "#181818",
              padding: "15px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
              transition: "0.3s"
            }}

            onMouseEnter={(e)=>{
              e.currentTarget.style.background="#282828"
            }}

            onMouseLeave={(e)=>{
              e.currentTarget.style.background="#181818"
            }}
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/727/727245.png"
              alt=""
              style={{
                width: "70px",
                marginBottom: "10px"
              }}
            />

            <div>{artist}</div>

          </div>

        ))}

      </div>


      {/* RECENTLY PLAYED */}

      <h2 style={{ marginBottom: "20px" }}>
        Recently Played
      </h2>

      <div>

        {recentSongs.map((song, index) => (

          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px",
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

            <div style={{ width: "30px" }}>
              {index + 1}
            </div>

            <div style={{ flex: 1 }}>
              {song}
            </div>

            <div style={{ color: "#1db954" }}>
              ▶
            </div>

          </div>

        ))}

      </div>

    </Dialog>

  );
};

export default Profile;