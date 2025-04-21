import React from "react";
import "./MarqueText.css";

const logos = [
  {id: 1, src: "src/assets/Icons/ui-ux.png", text: "UI/UX Design"},
  {id: 2, src: "src/assets/Icons/cloud-services.png", text: "Cloud Services"},
  {id: 3, src: "src/assets/Icons/web-designing.png", text: "Web Design"},
  {id: 4, src: "src/assets/Icons/cloudSecurity.png", text: "Cloud Security"},
];

const MarqueText = () => {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {/* Duplicating the content to make it seamless */}
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div className="marquee-item" key={index}>
            <img src={logo.src} alt={logo.text} className="brand-item-logo" />
            <div className="logotext">
              <p className="marque-item-title">{logo.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueText;
