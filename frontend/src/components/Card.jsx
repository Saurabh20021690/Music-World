import React from "react";
import { Play } from "lucide-react";
import "./Card.css";

const Card = ({ title, description, imageUrl, isRounded = false, onPlay }) => {

  const handlePlay = (e) => {
    e.stopPropagation();
    if (onPlay) onPlay();
  };

  return (
    <div className="spotify-card">

      <div className="spotify-card-image-container">

        <img
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop"
          }
          alt={title}
          className={`spotify-card-image ${isRounded ? "rounded" : ""}`}
        />

        <button
          className="spotify-play-button"
          aria-label={`Play ${title}`}
          onClick={handlePlay}
        >
          <Play size={22} fill="black" strokeWidth={0} />
        </button>

      </div>

      <div className="spotify-card-info">

        <h4 className="spotify-card-title">{title}</h4>

        <p className="spotify-card-description">{description}</p>

      </div>

    </div>
  );
};

export default Card;