import React, { useState, useEffect } from "react";
import "../Pages_css/circle.css"; // Create a CSS file for styling

const ScrollPercentageIndicator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const currentScrollPercentage = (scrollTop / documentHeight) * 100;

      setScrollPercentage(currentScrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="circle-container">
        <div className="circle" style={{background: `conic-gradient(
      var(--yellow) 0% ${scrollPercentage}%,    
      transparent ${scrollPercentage}% 100% 
    )`}}></div>
        <div className="percentage-text">{Math.round(scrollPercentage)}%</div>
      </div>
    </>
  );
};

export default ScrollPercentageIndicator;