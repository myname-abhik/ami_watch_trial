import React, { useState, useEffect } from "react";
import "../Pages_css/circle.css";

const ScrollPercentageIndicator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      if (documentHeight <= 0) {
        setScrollPercentage(0);
        return;
      }
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const currentScrollPercentage = Math.min(100, Math.max(0, (scrollTop / documentHeight) * 100));
      setScrollPercentage(currentScrollPercentage);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const rounded = Math.round(scrollPercentage);
  const isVisible = scrollPercentage > 2;

  // Premium conic gradient: luminous amber to warm orange ring with translucent glass track
  const ringStyle = {
    background: `conic-gradient(from 0deg, #f59e0b 0%, #ea580c ${rounded}%, rgba(255, 255, 255, 0.08) ${rounded}% 100%)`,
  };

  return (
    <div
      className={`circle-container ${isVisible ? "visible" : "hidden"}`}
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Scroll to top"
      role="button"
      aria-label="Scroll back to top"
    >
      <div className="circle-glass-ring" style={ringStyle}>
        <div className="circle-inner-glass">
          <div className="percentage-content">
            <span className="material-icons scroll-arrow-icon">keyboard_arrow_up</span>
            <span className="percentage-text">{rounded}%</span>
          </div>
        </div>
      </div>
      {isHovered && <span className="hover-label">Top</span>}
    </div>
  );
};

export default ScrollPercentageIndicator;