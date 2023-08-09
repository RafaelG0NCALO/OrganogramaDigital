import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const initialValue = localStorage.getItem("isDarkMode");
    return initialValue !== null ? JSON.parse(initialValue) : false;
  });

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    const body = document.querySelector("body");
    if (isDarkMode) {
      body?.classList.add("dark");
    } else {
      body?.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      className={`bg-gray-300 dark:bg-gray-700 rounded-full w-12 h-5 flex items-center justify-between transition-colors duration-300 focus:outline-none ${
        isLoginPage ? "fixed top-2 right-2" : ""
      }`}
      onClick={toggleDarkMode}
    >
      <span
        className={`block rounded-full w-4 h-4 transition-transform duration-300 ${
          isDarkMode ? "translate-x-7" : "translate-x-1"
        }`}
        style={{ backgroundColor: isDarkMode ? "#fbbf24" : "#f3f4f6" }}
      ></span>
    </button>
  );
};

export default DarkModeToggle;
