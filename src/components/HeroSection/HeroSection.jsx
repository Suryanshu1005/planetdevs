import React from "react";
import {Image} from "react-bootstrap"; // Import Image from react-bootstrap
import bannerShape from "../../assets/banner-shape-01.png";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="container custom-hero-section">
      <div className="banner">
        <Image src={bannerShape} fluid alt="Banner Shape" />
      </div>
    </div>
  );
};

export default HeroSection;
