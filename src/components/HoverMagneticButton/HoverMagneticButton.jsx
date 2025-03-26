import React, { useState } from "react";
import "./HoverMagneticButton.css";

const HoverMagneticButton = ({ text, icon }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    // Calculate offset from center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setOffset({ x, y });
  };

  const handleMouseLeave = () => {
    // Reset position smoothly
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      className="click"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
    >
      <div>{text}</div>
      <div className="down-arrow">
        {/* <i className="fas fa-arrow-down"></i> */}
        <i className={icon}></i>
      </div>
    </div>
  );
};

export default HoverMagneticButton;
