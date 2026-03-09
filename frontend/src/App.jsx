import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";

import AppLayout from "./pages/AppLayout";
import Player from "./components/Player";

// pages
import Premium from "./pages/premium/Premium";
import Profile from "./pages/Profile";
import AllSongs from "./pages/AllSongs";
import PlaylistPage from "./pages/PlaylistPage";
import "./App.css";

function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <div className="app-layout">

          <Routes>
            {/* Main Layout */}
            <Route path="/*" element={<AppLayout />} />
            <Route path="/songs" element={<AllSongs />} />
            <Route path="/playlist/:id" element={<PlaylistPage />} />

            {/* TopBar Pages */}
            <Route path="/premium" element={<Premium />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

          {/* Music Player */}
          <div className="player-container">
            <Player />
          </div>

        </div>
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;