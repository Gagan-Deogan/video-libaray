import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { PlaylistProvider } from "./context/PlaylistProvider"
import { BrowserRouter as Router } from "react-router-dom"
ReactDOM.render(
  <React.StrictMode>
    <PlaylistProvider>
      <Router>
        <App />
      </Router>
    </PlaylistProvider>
  </React.StrictMode>,
  document.getElementById('root')
);