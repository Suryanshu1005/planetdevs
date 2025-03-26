import React, { useState } from "react";
import "./FaqSection.css";

const FaqSection = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    {
      title: "What are your digital marketing services?",
      content:
        "We offer comprehensive digital marketing solutions including SEO, social media marketing, content marketing, and paid advertising strategies.",
    },
    {
      title: "How do you measure marketing success?",
      content:
        "We use data-driven metrics like conversion rates, ROI, engagement rates, and custom KPIs tailored to your business objectives.",
    },
    {
      title: "Do you provide custom marketing strategies?",
      content:
        "Yes, we develop personalized marketing strategies that align with your unique business goals, target audience, and industry specifics.",
    },
    {
      title: "What industries do you specialize in?",
      content:
        "We have experience across various industries including technology, healthcare, e-commerce, finance, and professional services.",
    },
    {
      title: "How long does it take to see results?",
      content:
        "Marketing results vary, but typically you can expect initial insights within 1-3 months, with significant impact visible around 6 months.",
    },
    {
      title: "What is your pricing model?",
      content:
        "We offer flexible pricing models including project-based, retainer, and performance-based pricing to suit different business needs.",
    },
  ];

  return (
    <div className="container faq-container">
      <div className="row">
        {faqs.map((faq, index) => (
          <div key={index} className="col col-md-6 mb-4">
            <div
              className={`accordion-item ${
                activeAccordion === index ? "active" : ""
              }`}
            >
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="accordion-title">{faq.title}</h3>
                <div className="accordion-icon">
                  {activeAccordion === index ? "-" : "+"}
                </div>
              </div>
              {activeAccordion === index && (
                <div className="accordion-body">
                  <p>{faq.content}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
