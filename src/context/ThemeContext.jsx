import  { createContext, useState, useEffect } from 'react';

// Create context
export const ThemeContext = createContext();

// ThemeProvider component
// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "night" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, handleToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
