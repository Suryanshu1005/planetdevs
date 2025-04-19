import "../../App.css";
import LargeBannerTitle from "../LargeBannerTitle/LargeBannerTitle";
import HeroSection from "../HeroSection/HeroSection";
import AboutUs from "../AboutUsSection/AboutUs";
import MarqueText from "../MarqueText/MarqueText";
import OutSteps from "../OurSteps/OutSteps";
import FaqSection from "../FaqSection/FaqSection";
import FooterSection from "../FooterSection/FooterSection";

function Home() {
  return (
    <>
      {/* Main Content - Now separate from rain container */}
      <div className="main-banner main-banner-1 px-2">
        <HeroSection />
        <div>
          <LargeBannerTitle />
        </div>
      </div>
      <div id="about" className="space-pt">
        <AboutUs />
      </div>
      <MarqueText />
      <div id="services" className="space-pt">
        <OutSteps />
      </div>
      <div id="expertise" className="space-pt">
        <FaqSection />
      </div>
    </>
  );
}

export default Home;
