import "./App.css";
import AboutUs from "./components/AboutUsSection/AboutUs";
import FaqSection from "./components/FAQSection/FaqSection";
import HeroSection from "./components/HeroSection/HeroSection";
import LargeBannerTitle from "./components/LargeBannerTitle/LargeBannerTitle";
import MarqueText from "./components/MarqueText/MarqueText";
import NavbarComponent from "./components/NavbarComponent/Navbar";
import OutSteps from "./components/OurSteps/OutSteps";
import RunningCounter from "./components/RunningCounter/RunningCounter";

function App() {
  return (
    <div className="rain-container">
      {/* Raindrop Effect */}
      <div className="raindrop drop1"></div>
      <div className="raindrop drop2"></div>
      <div className="raindrop drop3"></div>
      <div className="raindrop drop4"></div>
      <div className="raindrop drop5"></div>

      {/* Main Content */}
      <NavbarComponent />
      <div className="main-banner main-banner-1 px-2">
        <HeroSection />
        <div>
          <LargeBannerTitle />
        </div>
      </div>
      <AboutUs />
      {/* <RunningCounter target={} /> */}
      <MarqueText />
      <OutSteps />
      <FaqSection />
    </div>
  );
}

export default App;
