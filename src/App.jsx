import "./App.css";
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent/Navbar";
import Home from "./components/Home/Home";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import FooterSection from "./components/FooterSection/FooterSection";

function App() {
  return (
    <>
      <Router>
        {/* Rain Effect Overlay - Separate from content */}
        <div className="rain-container">
          <div className="raindrop drop1"></div>
          <div className="raindrop drop2"></div>
          <div className="raindrop drop3"></div>
          <div className="raindrop drop4"></div>
          <div className="raindrop drop5"></div>
        </div>

        {/* Main Content - Now separate from rain container */}
        <div className="content-wrapper">
          <NavbarComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUsPage />} />
          </Routes>
        </div>
        <div id="contact" className="space-pt">
          <FooterSection />
        </div>
      </Router>
    </>
  );
}

export default App;
