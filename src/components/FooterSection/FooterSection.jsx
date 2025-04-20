import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaDribbble,
  FaPaperPlane,
} from "react-icons/fa";
import "./FooterSection.css";

import address from "../../assets/address-info-contacts.svg";
import call from "../../assets/address-info-headphone.svg";
import email from "../../assets/address-info-email.svg";
import logo from "../../assets/PD-Logo.png";

const routes = [
  {
    link: "#",
    label: "Home",
  },
  {
    link: "#about",
    label: "About Us",
  },
  {
    link: "#",
    label: "Team",
  },
  {
    link: "#services",
    label: "Services",
  },
  {
    link: "#contact",
    label: "Contact",
  },
  {
    link: "#",
    label: "Blog",
  },
];

const FooterSection = () => {
  return (
    <div className="footer-main ">
      <footer className="container-global site-footer footer-dark">
        <div className="footer-container">
          <div className="row">
            {/* Where to Find Us */}
            <div className="col-xl-3 col-md-5">
              <div className="widget-address-info" style={{fontWeight: "bold"}}>
                <h5 className="widget-title">Where To Find Us</h5>
                <ul className="address-info-list">
                  <li>
                    <i className="icon">
                      <img className="img-fluid" src={address} alt="" />
                    </i>
                    <span className="info">
                      <span>Kalli paschim,  226014</span>lucknow, Uttar Pradesh
                    </span>
                  </li>
                  <li>
                    <i className="icon">
                      <img className="img-fluid" src={call} alt="" />
                    </i>
                    <span className="info">
                      <span>+91 7007759706 </span>Mon-fri 10:30am 7:30pm
                    </span>
                  </li>
                  <li>
                    <i className="icon">
                      <img className="img-fluid" src={email} alt="" />
                    </i>
                    <span className="info">
                      <span>info@planetdevelopers.com </span>24x7 online support
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-5 col-md-7">
              <div className="widget">
                <h5 className="widget-title">Newsletter</h5>
                {/* <div className="widget widget-newsletter mb-4 pb-2">
                  <div className="newsletter-form">
                    <input type="text" placeholder="Enter Your Email" />
                  </div>
                  <button>
                    <FaPaperPlane />
                  </button>
                </div> */}

                <div className="widget widget-newsletter mb-4 pb-2">
                  <form className="newsletter-form">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Email"
                      fdprocessedid="8jsgf8"
                    />
                    <button
                      type="submit"
                      className="subscribe-btn"
                      fdprocessedid="2rm8n6e"
                    >
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </form>
                </div>
                <div className="widget widget-menu">
                  <h6 className="widget-title">Quick Links</h6>{" "}
                  <ul className="list-unstyled list-col-3 mb-0">
                    {routes.map((route, index) => (
                      <li key={index}>
                        <a href={route.link}>{route.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Newsletter & Quick Links */}
            <div className="col-xl-3 col-md-12 ms-auto">
              <div className="footer-sections">
                <div className="widget widget-info">
                  <h5 className="widget-title">Contact us</h5>
                  <a className="number" href="tel:+91-9695553837">
                    +91-9695553837
                  </a>
                  <h6 className="title">and get a free estimate</h6>
                </div>

                {/* Social Icons */}
                {/* <div className="social-icons">
                  <div className="icons">
                    {" "}
                    <a href="#">FB</a>
                  </div>

                  <div className="icons">
                    {" "}
                    <a href="#">TR</a>
                  </div>
                  <div className="icons">
                    {" "}
                    <a href="#">DW</a>
                  </div>
                  <div className="icons">
                    {" "}
                    <a href="#">BE</a>
                  </div>
                </div> */}
              </div>
            </div>
            {/* Call Center */}
          </div>

          {/* Bottom Section */}
          <div className="footer-copyright">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <p>
                    <a className="footer-logo" href="index.html">
                      <img
                        // className="img-fluid"
                        width={175}
                        height={23}
                        src={logo}
                        alt="logo"
                      />
                    </a>
                  </p>
                </div>
                <div className="col-lg-6 text-lg-end">
                  <p>
                    Copyright © 2025 <a href="#">PlanetDevs</a> All rights
                    reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterSection;
