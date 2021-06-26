import "./assests/css/index.css";
import React from "react";
import ReactDOM from "react-dom";
import { PlaylistProvider } from "context/PlaylistProvider";
import { SaveVideosProvider } from "context/SaveVideosProvider";
import { PrefrencedVideosProvider } from "context/PrefrenceProvider";
import { SnakbarContextProvider } from "context/SnakbarProvider";
import { LoaderContextProvider } from "context/LoaderProvider";
import { AuthProvider } from "context/AuthProvider";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "context/ThemeProvider";
import { NotesProvider } from "context/NotesProvider";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <SnakbarContextProvider>
          <AuthProvider>
            <PlaylistProvider>
              <SaveVideosProvider>
                <LoaderContextProvider>
                  <NotesProvider>
                    <PrefrencedVideosProvider>
                      <App />
                    </PrefrencedVideosProvider>
                  </NotesProvider>
                </LoaderContextProvider>
              </SaveVideosProvider>
            </PlaylistProvider>
          </AuthProvider>
        </SnakbarContextProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
