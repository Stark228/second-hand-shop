import React, { useContext } from 'react';
import { ThemeContext } from './ThemProvider';

const ThemeToggleButton = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
  };

  return (
    <button onClick={handleThemeToggle}>Toggle Theme</button>
  );
};

export default ThemeToggleButton;
