import React, {useState} from "react";
import "./HoverMagneticButton.css";

const HoverMagneticButton = ({text, icon, onclick}) => {
  const [offset, setOffset] = useState({x: 0, y: 0});

  const handleMouseMove = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    // Calculate offset from center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setOffset({x, y});
  };

  const handleMouseLeave = () => {
    // Reset position smoothly
    setOffset({x: 0, y: 0});
  };

  return (
    <div
      onClick={onclick}
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
        {icon ? (
          <i className={icon}></i>
        ) : (
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_59_253)">
              <path
                d="M19.4854 11.4293L17.0513 12.221C13.1214 13.4993 10.3036 16.9595 9.84784 21.0668C9.49371 16.981 6.71926 13.5081 2.81255 12.2604L0.210283 11.4293"
                stroke="white"
                stroke-width="2"
              ></path>
              <path
                d="M9.83594 20.8889L9.83594 0"
                stroke="white"
                stroke-width="2"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_59_253">
                <rect
                  width="21.3333"
                  height="20"
                  fill="white"
                  transform="translate(20) rotate(90)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        )}
      </div>
    </div>
  );
};

export default HoverMagneticButton;
