// NavbarComponent.jsx
import React, {useState} from "react";
import {Navbar, Nav, Container, Image} from "react-bootstrap";
import "./NavbarComponent.css";
import {menuItemsLeft, menuItemsRight} from "../../constants";
// import logo from "../../assets/PD-Logo.png";
import logoWhite from "../../assets/PD-Logo-White.png";

const NavbarComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  // const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <>
      <Navbar expand="lg" className="custom-navbar" fixed="top">
        <div className="container d-flex justify-content-center align-items-center position-relative">
          {/* Left menu items */}
          <Nav className="d-none d-xl-flex">
            <div className="nav-link-container d-flex">
              {menuItemsLeft.map((item, index) => (
                <div key={index} className="nav-item-wrapper">
                  <Nav.Link
                    href={item.link}
                    className="nav-item nav-link-custom"
                  >
                    <p style={{padding: 0, margin: 0}}>{item.name}</p>
                    <p style={{padding: 0, margin: 0}}>
                      {item.submenu && (
                        <i
                          style={{fontSize: "12px", padding: 0}}
                          className="fa-solid fa-chevron-down"
                        ></i>
                      )}
                    </p>
                  </Nav.Link>
                </div>
              ))}
            </div>
          </Nav>

          {/* Brand logo (no margin) */}
          <Navbar.Brand href="/" className="brand-logo m-0">
            <span className="">
              <Image src={logoWhite} width={168} height={18} />
            </span>
          </Navbar.Brand>

          {/* Right menu items */}
          <Nav className="d-none d-xl-flex">
            <div className="nav-link-container d-flex">
              {menuItemsRight.map((item, index) => (
                <div key={index} className="nav-item-wrapper">
                  <Nav.Link
                    href={item.link}
                    className="nav-item nav-link-custom"
                  >
                    <p style={{padding: 0, margin: 0}}>{item.name}</p>
                    <p style={{padding: 0, margin: 0}}>
                      {item.submenu && (
                        <i
                          style={{fontSize: "12px", padding: 0}}
                          className="fa-solid fa-chevron-down"
                        ></i>
                      )}
                    </p>
                  </Nav.Link>
                </div>
              ))}
            </div>
          </Nav>

          {/* Hamburger menu (always visible, positioned absolutely on the right) */}
          <div
            className="hamburger-menu-container position-absolute"
            style={{right: "15px"}}
          >
            <div
              className="hamburger-menu d-lg-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={toggleSidebar}
            >
              {[-10, 0, -10].map((initialX, index) => (
                <div
                  key={index}
                  className={`line ${isHovered ? "hovered" : ""}`}
                  style={{
                    "--initial-x": `${initialX}px`,
                    "--direction": index % 2 === 0 ? "1" : "-1",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </Navbar>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={closeSidebar}>
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        <div className="sidebar-content">
          <div className="body-inner">
            <div class="about-info">
              <h4 class="title mb-3">Scalable Business for Startups</h4>
              <p>
                Get the oars in the water and start rowing. Execution is the
                single biggest factor in achievement so the faster and better
                your execution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}
    </>
  );
};

export default NavbarComponent;
