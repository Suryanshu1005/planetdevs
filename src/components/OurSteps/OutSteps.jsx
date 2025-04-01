import React from "react";
import "./OutSteps.css";
import subtitleIcon from "../../assets/subtitle-icon.png";
import informationSec from "../../assets/Information-Security.svg";
import ContentManagement from "../../assets/Content-Management.svg";
import DataSync from "../../assets/Data-Synchronization.svg";
import EventProcessing from "../../assets/Event-Processing.svg";
import MobilePlat from "../../assets/Mobile-Platforms.svg";
import ProcessAuto from "../../assets/Process-Automation.svg";
import HoverMagneticButton from "../HoverMagneticButton/HoverMagneticButton";

const OutSteps = () => {
  return (
    <section className="container-global our-step-container space-pt">
      <div className="row">
        <div className="col-xxl-5 col-xl-5 mb-5 mb-xl-0 ">
          <div className="sticky-top" style={{top: "120px"}}>
            <div className="col-12 st">
              <div className="col-xl-10 mb-5 mb-xl-0 ">
                <div className="subtitle-section d-flex align-items-center mb-2 ">
                  <img
                    src={subtitleIcon}
                    alt="subtitleIcon"
                    className="me-2"
                    style={{width: "30px", height: "30px"}}
                  />
                  <span className="about-us-title">Our Steps</span>
                </div>
                <p className="our-step-description-container text-start">
                  We build security that never sleeps
                </p>
                <div class="ps-xxl-5 ms-0 ms-md-5" style={{width: "100%"}}>
                  <p className="ourstep-description">
                    Our cutting-edge cloud security solutions provide 24/7
                    protection, ensuring your data, applications, and
                    infrastructure remain safe at all times. With advanced
                    threat detection, real-time monitoring, and proactive
                    defense strategies, we safeguard your business from
                    potential risks—so you can focus on growth without
                    compromise
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-6 col-xl-7">
          <div className="row">
            <div className="col-sm-6">
              <div className="services grid-wrapper">
                <div className="service-wrapper service-style-1">
                  <div className="service-inner">
                    <div className="service-icon">
                      <img className="img-fluid" src={informationSec} alt="#" />
                    </div>
                    <div className="service-content">
                      <h5 className="service-title">Information Security</h5>
                      <p>
                        Remind yourself of someone you know who died suddenly
                        and the fact that there is no guarantee that tomorrow
                      </p>
                    </div>
                  </div>
                </div>
                <div className="service-wrapper service-style-1">
                  <div className="service-inner">
                    <div className="service-icon">
                      <img className="img-fluid" src={DataSync} alt="#" />
                    </div>
                    <div className="service-content">
                      <h5 className="service-title">
                        Reliable, Secure, and Scalable Cloud Solutions
                      </h5>
                      <p>
                        Our cloud security solutions provide 24/7 protection
                        with real-time monitoring and proactive defense, keeping
                        your data and infrastructure safe—so you can focus on
                        growth with confidence
                      </p>
                    </div>
                  </div>
                </div>
                <div className="service-wrapper service-style-1">
                  <div className="service-inner">
                    <div className="service-icon">
                      <img
                        className="img-fluid"
                        src={EventProcessing}
                        alt="#"
                      />
                    </div>
                    <div className="service-content">
                      <h5 className="service-title">Event Processing</h5>
                      <p>
                        There is really no magic to it and it’s not reserved
                        only for a select few people. As such, success really
                        has nothing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="services grid-wrapper service-top-space">
                <div className="service-wrapper service-style-1">
                  <div className="service-inner">
                    <div className="service-icon">
                      <img className="img-fluid" src={ProcessAuto} alt="#" />
                    </div>
                    <div className="service-content">
                      <h5 className="service-title">Process Automation</h5>
                      <p>
                        It must come from the natural product of your desire to
                        achieve something and your belief that you are capable.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="service-wrapper service-style-1">
                  <div className="service-inner">
                    <div className="service-icon">
                      <img className="img-fluid" src={MobilePlat} alt="#" />
                    </div>
                    <div className="service-content">
                      <h5 className="service-title">Mobile Platforms</h5>
                      <p>
                        There is really no magic to it and it’s not reserved
                        only for a select few people. As such, success really
                        has nothing.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="service-wrapper service-style-1">
                  <div className="service-inner">
                    <div className="service-icon">
                      <img
                        className="img-fluid"
                        src={ContentManagement}
                        alt="#"
                      />
                    </div>
                    <div className="service-content">
                      <h5 className="service-title">Content Management</h5>
                      <p>
                        It must come from the natural product of your desire to
                        achieve something and your belief that you are capable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutSteps;
