import { useContext, createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  useEffect(() => {
    if (theme === "DARK") {
      document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", "DARK");
    } else {
      document.body.classList.toggle("light-theme");
      localStorage.setItem("theme", "LIGHT");
    }
  }, []);

  const toggleTheme = () => {
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("light-theme");
      setTheme(() =>
        document.body.classList.contains("light-theme") ? "LIGHT" : "DARK"
      );
    } else {
      document.body.classList.toggle("dark-theme");
      setTheme(() =>
        document.body.classList.contains("dark-theme") ? "DARK" : "LIGHT"
      );
    }
  };

  useEffect(() => {
    console.log(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
