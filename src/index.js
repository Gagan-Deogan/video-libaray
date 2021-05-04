import "./assests/css/index.css";
import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./Context/AuthContext";
import { PlaylistProvider } from "./Context/PlaylistProvider";
import { SaveVideosProvider } from "./Context/SaveVideosProvider";
import { LikedAndDisLikedVideosProvider } from "./Context/LikedAndDislikeVideosProvider";
import { SnakbarContextProvider } from "./Context/SnakbarContext";
import { LoaderContextProvider } from "./Context/LoaderContext";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <SnakbarContextProvider>
          <PlaylistProvider>
            <SaveVideosProvider>
              <LoaderContextProvider>
                <LikedAndDisLikedVideosProvider>
                  <App />
                </LikedAndDisLikedVideosProvider>
              </LoaderContextProvider>
            </SaveVideosProvider>
          </PlaylistProvider>
        </SnakbarContextProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
