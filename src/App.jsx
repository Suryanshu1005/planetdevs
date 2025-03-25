import "./App.css";
import HeroSection from "./components/HeroSection/HeroSection";
import NavbarComponent from "./components/NavbarComponent/Navbar";

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
      <HeroSection />
    </div>
  );
}

export default App;
