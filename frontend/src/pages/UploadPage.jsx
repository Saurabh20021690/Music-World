import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || " https://music-world-taupe.vercel.app";

const UploadPage = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState("");

  const handleImage = (file) => {
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !artist) {
      setStatus("Please enter song title and artist.");
      return;
    }

    if (!audioFile) {
      setStatus("Please select an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("audio", audioFile);

    if (imageFile) {
      formData.append("coverImage", imageFile);
    }

    try {
      setIsUploading(true);
      setStatus("Uploading your music...");

      const res = await axios.post(`${API_URL}/api/songs`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data) {
        setStatus("✅ Song uploaded successfully!");

        setTitle("");
        setArtist("");
        setAudioFile(null);
        setImageFile(null);
        setPreview(null);

        document.getElementById("upload-form").reset();
      }
    } catch (error) {
      setStatus(
        "❌ Upload failed: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f0f0f,#121212,#1a1a1a)",
        padding: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        color: "white",
      }}
    >
      {/* RECTANGLE PANEL */}

      <div
        style={{
          width: "900px",
          background: "rgba(24,24,24,0.95)",
          borderRadius: "14px",
          padding: "40px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
          backdropFilter: "blur(10px)",
          transition: "0.3s",
        }}
      >
        {/* HEADER */}

        <div style={{ marginBottom: "35px" }}>
          <h1
            style={{
              fontSize: "38px",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            Upload Your Music
          </h1>

          <p style={{ color: "#b3b3b3" }}>
            Share your tracks with the world 🌎
          </p>
        </div>

        {/* FORM */}

        <form
          id="upload-form"
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "25px",
          }}
        >
          {/* TITLE */}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "6px" }}>Song Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter song title"
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #333",
                background: "#121212",
                color: "white",
                outline: "none",
                transition: "0.3s",
              }}
            />
          </div>

          {/* ARTIST */}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "6px" }}>Artist</label>

            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Artist name"
              style={{
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #333",
                background: "#121212",
                color: "white",
                outline: "none",
                transition: "0.3s",
              }}
            />
          </div>

          {/* AUDIO */}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "6px" }}>Audio File</label>

            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files[0])}
            />
          </div>

          {/* COVER IMAGE */}

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "6px" }}>Cover Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImage(e.target.files[0])}
            />
          </div>

          {/* IMAGE PREVIEW */}

          {preview && (
            <div
              style={{
                gridColumn: "span 2",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginTop: "10px",
              }}
            >
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "120px",
                  borderRadius: "8px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                  transition: "0.3s",
                }}
              />

              <span style={{ color: "#b3b3b3" }}>
                Cover preview
              </span>
            </div>
          )}

          {/* BUTTON */}

          <div style={{ gridColumn: "span 2" }}>
            <button
              type="submit"
              disabled={isUploading}
              style={{
                marginTop: "20px",
                width: "200px",
                padding: "14px",
                borderRadius: "30px",
                border: "none",
                background:
                  "linear-gradient(135deg,#1db954,#1ed760)",
                fontWeight: "600",
                fontSize: "16px",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.target.style.transform = "scale(1)")
              }
            >
              {isUploading ? "Uploading..." : "Upload Song"}
            </button>
          </div>

          {/* STATUS */}

          {status && (
            <div
              style={{
                gridColumn: "span 2",
                marginTop: "10px",
                padding: "12px",
                borderRadius: "6px",
                background: status.includes("failed")
                  ? "#3a1212"
                  : "#0f2e1a",
                color: status.includes("failed")
                  ? "#ff6b6b"
                  : "#1ed760",
              }}
            >
              {status}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadPage;