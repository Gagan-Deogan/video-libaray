import { useContext, createContext, useState, useEffect } from "react";

const ThemeContext = createContext();
const matchDark = "(prefers-color-scheme: dark)";
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia && window.matchMedia(matchDark).matches
  );
  useEffect(() => {
    const matcher = window.matchMedia(matchDark);
    const onChange = ({ matches }) => setIsDark(matches);
    matcher.addEventListener("change", onChange);
    return () => {
      matcher.removeEventListener("change", onChange);
    };
  }, [setIsDark]);

  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.toggle("light-theme");
    } else {
      document.body.classList.toggle("dark-theme");
    }
  };

  const theme = isDark ? "dark" : "light";
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
