import "./App.css";
import AboutUs from "./components/AboutUsSection/AboutUs";
import FaqSection from "./components/FAQSection/FaqSection";
import FooterSection from "./components/FooterSection/FooterSection";
import HeroSection from "./components/HeroSection/HeroSection";
import LargeBannerTitle from "./components/LargeBannerTitle/LargeBannerTitle";
import MarqueText from "./components/MarqueText/MarqueText";
import NavbarComponent from "./components/NavbarComponent/Navbar";
import OutSteps from "./components/OurSteps/OutSteps";
import RunningCounter from "./components/RunningCounter/RunningCounter";

function App() {
  return (
    <>
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
        <div className="space-pt">
          <FaqSection />
        </div>
        <div className="space-pt">
          <FooterSection />
        </div>
      </div>
    </>
  );
}

export default App;
