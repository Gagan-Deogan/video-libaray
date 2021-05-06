import "./assests/css/index.css";
import React from "react";
import ReactDOM from "react-dom";
import { PlaylistProvider } from "./Context/PlaylistContext";
import { SaveVideosProvider } from "./Context/SaveVideosContext";
import { LikedAndDisLikedVideosProvider } from "./Context/LikedAndDislikeVideosContext";
import { SnakbarContextProvider } from "./Context/SnakbarContext";
import { LoaderContextProvider } from "./Context/LoaderContext";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import { NotesProvider } from "./Context/NotesContext";
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
