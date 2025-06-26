import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { RiSunFoggyLine } from "react-icons/ri";
import { FaCloudMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme")
  );
  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
    html.setAttribute("data-theme", newTheme);
  };

  return (
    <div>
      <Tooltip id="dark" />
      <Tooltip id="light" />
      <button className="hover:cursor-pointer" onClick={toggleTheme}>
        {theme == "light" ? (
          <FaCloudMoon
            size={20}
            data-tooltip-id="dark"
            data-tooltip-content="Switch To Dark Mode"
            data-tooltip-place="bottom"
          />
        ) : (
          <RiSunFoggyLine
            size={20}
            data-tooltip-id="light"
            data-tooltip-content="Switch To Light Mode"
            data-tooltip-place="bottom"
          />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
