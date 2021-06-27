import "./assests/css/index.css";
import React from "react";
import ReactDOM from "react-dom";
import { PlaylistProvider } from "context/PlaylistProvider";
import { SnakbarContextProvider } from "context/SnakbarProvider";
import { AuthProvider } from "context/AuthProvider";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "context/ThemeProvider";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <SnakbarContextProvider>
          <AuthProvider>
            <PlaylistProvider>
              <App />
            </PlaylistProvider>
          </AuthProvider>
        </SnakbarContextProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
