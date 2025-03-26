import React from "react";
import "./AboutUs.css";
import aboutus1 from "../../assets/about-01.jpg";
import aboutus2 from "../../assets/about-03.jpg";
import subtitleIcon from "../../assets/subtitle-icon.png";
import HoverMagneticButton from "../HoverMagneticButton/HoverMagneticButton";
const AboutUs = () => {
  return (
    <section className="space-pt">
      <div className="container-global about-us-container ">
        <div className="">
          <div className="section-title">
            <div className="subtitle-section">
              <img src={subtitleIcon} alt="subtitleIcon" />
              <span className="about-us-title">About Us</span>
            </div>
            <span className="about-us-description">
              Your Experience Is Everything To Us
            </span>
          </div>
          <div className="row">
            <div class="col-sm-4">
              <img className="img-fluid" src={aboutus2} alt="about us" />
            </div>

            <div class="col-sm-8">
              <p
                class="ps-lg-3 mt-4 mt-sm-0"
                style={{fontFamily: "Jost, sans-serif"}}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
              <div class="d-flex justify-content-center mt-5 ms-sm-5 ms-0">
                <HoverMagneticButton
                  text={"About Us"}
                  icon={"fas fa-arrow-down"}
                />
              </div>
            </div>
            {/* <div className="col-sm-8">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
              <div className="about-us-hover-button">
                <HoverMagneticButton
                  text={"About Us"}
                  icon={"fas fa-arrow-down"}
                />
              </div>
            </div> */}
          </div>
        </div>
        <div className="col-lg-5">
          <img className="img-fluid ps-lg-5" src={aboutus1} />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
