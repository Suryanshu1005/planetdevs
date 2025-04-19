import React from "react";
import "./AboutUsPage.css";

const AboutUsPage = () => {
  return (
    <div className="aboutus-container">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Your success is our mission</p>
      </header>

      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          We’re a passionate team of creators, developers, and designers
          building solutions that make life easier and more enjoyable. Our
          mission is to empower businesses and individuals through innovation
          and technology.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Do</h2>
        <p>
          From web development to digital strategy, we help brands thrive in the
          digital world. Our team delivers end-to-end solutions tailored to your
          needs.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Values</h2>
        <ul>
          <li>🌟 Innovation</li>
          <li>💬 Transparency</li>
          <li>🤝 Collaboration</li>
          <li>🚀 Growth Mindset</li>
        </ul>
      </section>
    </div>
  );
};

export default AboutUsPage;
