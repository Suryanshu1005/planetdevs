import React from "react";
import {Image} from "react-bootstrap";
import bannerShape from "../../assets/banner-shape-01.png";
import "./HeroSection.css";
import HoverMagneticButton from "../HoverMagneticButton/HoverMagneticButton";

const HeroSection = () => {
  return (
    <div className="container-global">
      <div className="row">
        <div className="col-md-6">
          {/* Image Section */}
          <div className="img-fluid d-sm-flex d-block banner-image-center">
            <img
              src={bannerShape}
              fluid
              alt="Banner Shape"
              className="hero-image "
            />
          </div>
          {/* Text Section */}
        </div>
        <div className="col-md-6 ms-auto">
          <div className="banner-content">
            <h1 className="banner-title-1">Creative Solutions Real Results</h1>
          </div>
          <div className="attract-hover">
            <HoverMagneticButton
              text={"Get a Quote"}
              icon={"fas fa-arrow-down"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
