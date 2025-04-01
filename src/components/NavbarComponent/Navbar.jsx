// NavbarComponent.jsx
import React, {useState} from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import "./NavbarComponent.css";
import {menuItems} from "../../constants";

const NavbarComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <>
      <Navbar expand="lg" className="custom-navbar " fixed="top">
        <Container className="navbar-container">
          <Navbar.Brand href="/" className="brand-logo">
            <span className="logo-text">Planet Devs</span>
          </Navbar.Brand>

          <Navbar id="basic-navbar-nav ">
            <Nav className="nav-link-container d-none d-xl-flex">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="nav-item-wrapper"
                  onMouseEnter={() => setActiveSubmenu(index)} // Show submenu on hover
                  onMouseLeave={() => setActiveSubmenu(null)} // Hide submenu on leave
                >
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
                  {item.submenu && activeSubmenu === index && (
                    <div className="submenu">
                      {item.submenu.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.link}
                          className="submenu-item"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </Nav>
          </Navbar>

          <div className="hamburger-menu-container">
            <div
              className="hamburger-menu"
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
        </Container>
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
