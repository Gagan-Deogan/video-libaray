import "./assests/css/index.css";
import React from "react";
import ReactDOM from "react-dom";
import { PlaylistProvider } from "./Context/PlaylistProvider";
import { SaveVideosProvider } from "./Context/SaveVideosProvider";
import { LikedAndDisLikedVideosProvider } from "./Context/LikedAndDislikeVideosProvider";
import { SnakbarContextProvider } from "./Context/SnakbarContext";
import { LoaderContextProvider } from "./Context/LoaderContext";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemePovider";
import { NotesProvider } from "./Context/NotesProvider";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <SnakbarContextProvider>
          <PlaylistProvider>
            <SaveVideosProvider>
              <LoaderContextProvider>
                <NotesProvider>
                  <LikedAndDisLikedVideosProvider>
                    <App />
                  </LikedAndDisLikedVideosProvider>
                </NotesProvider>
              </LoaderContextProvider>
            </SaveVideosProvider>
          </PlaylistProvider>
        </SnakbarContextProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
