import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './global/layout.js';
import Home from './modules/dashboard/home.js';
import Blog from './modules/dashboard/blogs.js';
import Profile from './modules/profile/profile.js';
import ReactGA from 'react-ga';
import { useEffect, useState } from 'react';

const TRACKING_ID = "UA-237899563-1"; // OUR_TRACKING_ID
//ReactGA.initialize(TRACKING_ID);


function App(){

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, []);

  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default  App;
