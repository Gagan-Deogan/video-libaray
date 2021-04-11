import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { PlaylistProvider } from "./context/PlaylistProvider"
import { SaveVideosProvider } from  "./context/SaveVideosProvider"
import { LikedAndDisLikedVideosProvider } from "./context/LikedAndDislikedVideosProvide"
import { BrowserRouter as Router } from "react-router-dom"
ReactDOM.render(
  <React.StrictMode>
    <PlaylistProvider>
      <SaveVideosProvider>
        <LikedAndDisLikedVideosProvider>
          <Router>
            <App />
          </Router>
        </LikedAndDisLikedVideosProvider>
      </SaveVideosProvider>
    </PlaylistProvider>
  </React.StrictMode>,
  document.getElementById('root')
);