import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./FaqSection.css";
import subtitleIcon from "../../assets/subtitle-icon.png";

const FaqSection = () => {
  const [activeKey, setActiveKey] = useState(null);

  const faqs = [
    {
      id: "collapseOne",
      title: "What are your digital marketing services?",
      content:
        "We offer comprehensive digital marketing solutions including SEO, social media marketing, content marketing, and paid advertising strategies.",
    },
    {
      id: "collapseTwo",
      title: "How do you measure marketing success?",
      content:
        "We use data-driven metrics like conversion rates, ROI, engagement rates, and custom KPIs tailored to your business objectives.",
    },
    {
      id: "collapseThree",
      title: "Do you provide custom marketing strategies?",
      content:
        "Yes, we develop personalized marketing strategies that align with your unique business goals, target audience, and industry specifics.",
    },
    {
      id: "collapseFour",
      title: "What industries do you specialize in?",
      content:
        "We have experience across various industries including technology, healthcare, e-commerce, finance, and professional services.",
    },
    {
      id: "collapseFive",
      title: "How long does it take to see results?",
      content:
        "Marketing results vary, but typically you can expect initial insights within 1-3 months, with significant impact visible around 6 months.",
    },
    {
      id: "collapseSix",
      title: "What is your pricing model?",
      content:
        "We offer flexible pricing models including project-based, retainer, and performance-based pricing to suit different business needs.",
    },
  ];

  // Split FAQs evenly between two columns
  const midpoint = Math.ceil(faqs.length / 2);
  const leftColumnFaqs = faqs.slice(0, midpoint);
  const rightColumnFaqs = faqs.slice(midpoint);

  const renderAccordion = (faqs, startIndex) => {
    return faqs.map((faq, index) => {
      const actualIndex = startIndex + index;
      return (
        <div key={faq.id} className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button custom-accordion-button ${
                activeKey === actualIndex ? "" : "collapsed"
              }`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${faq.id}`}
              aria-expanded={activeKey === actualIndex}
              onClick={() =>
                setActiveKey(activeKey === actualIndex ? null : actualIndex)
              }
            >
              <span className="accordion-title">{faq.title}</span>
              <span className="btn-click">
                {activeKey === actualIndex ? (
                  <i className="fa-solid fa-minus"></i>
                ) : (
                  <i className="fa-solid fa-plus"></i>
                )}
              </span>
            </button>
          </h2>
          <div
            id={faq.id}
            className={`accordion-collapse collapse ${
              activeKey === actualIndex ? "show" : ""
            }`}
          >
            <div className="accordion-body">{faq.content}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container-global faq-container">
      <div class="row">
        <div class="col-md-12 text-center">
          <div class="section-title">
            <span class="about-us-title justify-content-center">
              <img class="img-fluid" src={subtitleIcon} alt="subtitleIcon" />{" "}
              FAQ
            </span>
            <h2 class="title mb-0">Frequently Asked Questions</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="accordion" id="accordionLeft">
            {renderAccordion(leftColumnFaqs, 0)}
          </div>
        </div>
        <div className="col-md-6">
          <div className="accordion" id="accordionRight">
            {renderAccordion(rightColumnFaqs, midpoint)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
