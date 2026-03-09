import React from "react";
import { useNavigate } from "react-router-dom";

const Dialog = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "900px",
          maxHeight: "80vh",
          background: "#121212",
          borderRadius: "12px",
          padding: "30px",
          overflowY: "auto",
          position: "relative",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "#242424",
            border: "none",
            color: "white",
            width: "35px",
            height: "35px",
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ✕
        </button>

        {/* Title */}
        <h1 style={{ marginBottom: "25px" }}>{title}</h1>

        {children}
      </div>
    </div>
  );
};

export default Dialog;