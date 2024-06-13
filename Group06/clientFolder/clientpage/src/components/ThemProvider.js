import React, { createContext, useState } from 'react';

// Create the ThemeContext
export const ThemeContext = createContext();

// Create a provider component for the ThemeContext
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
  
    const changeTheme = newTheme => {
      setTheme(newTheme);
    };
  
    const themeStyles = {
      light: {
        '--background-color': '#f4f4f4',
        '--text-color': '#333',
      },
      dark: {
        '--background-color': '#333',
        '--text-color': '#f4f4f4',
      },
    };
  
    return (
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <div style={themeStyles[theme]}>{children}</div>
      </ThemeContext.Provider>
    );
  };
