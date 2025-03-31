import React from "react";
import "./OutSteps.css";
import subtitleIcon from "../../assets/subtitle-icon.png";
import informationSec from "../../assets/Information-Security.svg";
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
                  Digital Marketing Services That Help You Grow.
                </p>
                <div class="ps-xxl-5 ms-0 ms-md-5" style={{width: "100%"}}>
                  <p className="ourstep-description">
                    We all know that nothing moves until someone makes a
                    decision. The first action is always in making the decision
                    to proceed. which most people overlook, we don’t do it
                    intentionally or with malice.
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
                      <img className="img-fluid" src={informationSec} alt="#" />
                    </div>
                    <div className="service-content">
                      <h5 className="service-title">Data Synchronization</h5>
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
                      <img className="img-fluid" src={informationSec} alt="#" />
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
                      <img className="img-fluid" src={informationSec} alt="#" />
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
                      <img className="img-fluid" src={informationSec} alt="#" />
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
                      <img className="img-fluid" src={informationSec} alt="#" />
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
