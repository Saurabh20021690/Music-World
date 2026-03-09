import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import MainView from '../components/MainView';
import SearchPage from './SearchPage';
import UploadPage from './UploadPage';

const AppLayout = () => {
    return (
        <>
            <div className="sidebar-container">
                <Sidebar />
            </div>

            <div className="main-view-container panel" style={{ overflowY: 'auto', position: 'relative' }}>
                <TopBar />
                <Routes>
                    <Route path="/" element={<MainView />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/upload" element={<UploadPage />} />
                </Routes>
            </div>
        </>
    );
};

export default AppLayout;
