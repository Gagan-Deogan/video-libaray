import React from "react";
import ReactDOM from "react-dom";
import "./assests/css/index.css";
import App from "./App";
import { PlaylistProvider } from "./Context";
import { SaveVideosProvider } from "./Context";
import { LikedAndDisLikedVideosProvider } from "./Context";
import { AuthProvider } from "./Context/AuthContext/";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <PlaylistProvider>
          <SaveVideosProvider>
            <LikedAndDisLikedVideosProvider>
              <App />
            </LikedAndDisLikedVideosProvider>
          </SaveVideosProvider>
        </PlaylistProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
