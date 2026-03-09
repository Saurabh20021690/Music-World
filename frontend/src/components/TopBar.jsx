////import React from 'react';
////import { Link, useNavigate } from 'react-router-dom';
////import { ChevronLeft, ChevronRight, Bell, Users, User, Upload } from 'lucide-react';
////import './TopBar.css';

////const TopBar = () => {
////    const navigate = useNavigate();

////    return (
////        <div className="topbar">
////            <div className="topbar-left">
////                <button className="nav-circle tooltip-container" aria-label="Go back" onClick={() => navigate(-1)}>
////                    <ChevronLeft size={24} />
////                </button>
////                <button className="nav-circle tooltip-container" aria-label="Go forward" onClick={() => navigate(1)}>
////                    <ChevronRight size={24} />
////                </button>
////            </div>

////            <div className="topbar-right">
////                <Link to="/upload" style={{ textDecoration: 'none' }}>
////                    <button className="explore-premium" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
////                        <Upload size={16} /> Add Song
////                    </button>
////                </Link>
////                <button className="explore-premium">Explore Premium</button>
////                <button className="install-app text-subdued nav-circle-btn">
////                    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor">
////                        <path d="M4.995 8.745a.75.75 0 0 1 1.06 0L7.25 9.939V4a.75.75 0 0 1 1.5 0v5.94l1.195-1.195a.75.75 0 1 1 1.06 1.06L8.53 12.28a.75.75 0 0 1-1.06 0L4.995 9.805a.75.75 0 0 1 0-1.06z"></path>
////                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z"></path>
////                    </svg>
////                    Install App
////                </button>
////                <button className="nav-circle tooltip-container" aria-label="What's new">
////                    <Bell size={16} />
////                </button>
////                <button className="nav-circle tooltip-container" aria-label="Friend Activity">
////                    <Users size={16} />
////                </button>
////                <button className="user-profile nav-circle tooltip-container" aria-label="Saurabh Satpute">
////                    <User size={18} />
////                </button>
////            </div>
////        </div>
////    );
////};

////export default TopBar;


//import React from 'react';
//import { Link, useNavigate } from 'react-router-dom';
//import { ChevronLeft, ChevronRight, Bell, Users, User, Upload } from 'lucide-react';
//import './TopBar.css';

//const TopBar = () => {
//    const navigate = useNavigate();

//    return (
//        <div className="topbar">

//            {/* LEFT SIDE */}
//            <div className="topbar-left">
//                <button
//                    className="nav-circle tooltip-container"
//                    aria-label="Go back"
//                    onClick={() => navigate(-1)}
//                >
//                    <ChevronLeft size={24} />
//                </button>

//                <button
//                    className="nav-circle tooltip-container"
//                    aria-label="Go forward"
//                    onClick={() => navigate(1)}
//                >
//                    <ChevronRight size={24} />
//                </button>
//            </div>

//            {/* RIGHT SIDE */}
//            <div className="topbar-right">

//                {/* ADD SONG */}
//                <Link to="/upload" style={{ textDecoration: "none" }}>
//                    <button
//                        className="explore-premium"
//                        style={{ display: "flex", alignItems: "center", gap: "8px" }}
//                    >
//                        <Upload size={16} /> Add Song
//                    </button>
//                </Link>

//                {/* PREMIUM PAGE */}
//                <Link to="/premium" style={{ textDecoration: "none" }}>
//                    <button className="explore-premium">
//                        Explore Premium
//                    </button>
//                </Link>

//                {/* INSTALL APP */}
//                <button
//                    className="install-app text-subdued nav-circle-btn"
//                    onClick={() => alert("Install feature coming soon")}
//                >
//                    <svg role="img" height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
//                        <path d="M4.995 8.745a.75.75 0 0 1 1.06 0L7.25 9.939V4a.75.75 0 0 1 1.5 0v5.94l1.195-1.195a.75.75 0 1 1 1.06 1.06L8.53 12.28a.75.75 0 0 1-1.06 0L4.995 9.805a.75.75 0 0 1 0-1.06z"></path>
//                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13z"></path>
//                    </svg>
//                    Install App
//                </button>

//                {/* NOTIFICATIONS */}
//                <Link to="/notifications">
//                    <button className="nav-circle tooltip-container" aria-label="Notifications">
//                        <Bell size={16} />
//                    </button>
//                </Link>

//                {/* FRIEND ACTIVITY */}
//                <Link to="/friends">
//                    <button className="nav-circle tooltip-container" aria-label="Friend Activity">
//                        <Users size={16} />
//                    </button>
//                </Link>

//                {/* PROFILE PAGE */}
//                <Link to="/profile">
//                    <button className="user-profile nav-circle tooltip-container" aria-label="Profile">
//                        <User size={18} />
//                    </button>
//                </Link>

//            </div>
//        </div>
//    );
//};

//export default TopBar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Users,
  User,
  Upload,
  Download
} from "lucide-react";
import "./TopBar.css";

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="topbar">

      {/* LEFT NAVIGATION */}
      <div className="topbar-left">

        <button
          className="nav-circle"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={20} />
        </button>

        <button
          className="nav-circle"
          onClick={() => navigate(1)}
        >
          <ChevronRight size={20} />
        </button>

      </div>


      {/* RIGHT CONTROLS */}
      <div className="topbar-right">

        {/* ADD SONG */}
        <Link to="/upload" className="topbar-link">
          <button className="premium-btn">
            <Upload size={16} />
            Add Song
          </button>
        </Link>

        {/* PREMIUM */}
        <Link to="/premium" className="topbar-link">
          <button className="premium-btn">
            Explore Premium
          </button>
        </Link>

  
        {/*<Link to="/notifications">
          <button className="nav-circle">
            <Bell size={18} />
          </button>
        </Link>*/}

        {/*FRIEND ACTIVITY*/}
        {/*<Link to="/friends">
          <button className="nav-circle">
            <Users size={18} />
          </button>
        </Link>*/}

        {/* USER PROFILE */}
        <Link to="/profile">
          <button className="profile-btn">
            <User size={18} />
          </button>
        </Link>

      </div>

    </div>
  );
};

export default TopBar;