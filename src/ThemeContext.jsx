import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Check local storage first, default to 'dark' if nothing is saved
  const [theme, setTheme] = useState(
    localStorage.getItem("tfc_theme") || "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove both classes, then add the active one to the <html> tag
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Save their preference
    localStorage.setItem("tfc_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme anywhere
export const useTheme = () => useContext(ThemeContext);