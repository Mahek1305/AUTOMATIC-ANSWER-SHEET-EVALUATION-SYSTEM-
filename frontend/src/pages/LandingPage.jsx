
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "📄",
      title: "Upload Question Paper",
      desc: "Upload question papers securely for AI processing.",
    },
    {
      icon: "🤖",
      title: "AI Question Parsing",
      desc: "Automatically extract questions and marks.",
    },
    {
      icon: "✏️",
      title: "Review & Edit",
      desc: "Review and modify extracted questions.",
    },
    {
      icon: "📋",
      title: "Generate Rubric",
      desc: "Create evaluation rubric automatically.",
    },
    {
      icon: "📝",
      title: "Upload Answer Sheets",
      desc: "Upload student answer sheets for evaluation.",
    },
    {
      icon: "📊",
      title: "AI Evaluation Results",
      desc: "Generate evaluation results and insights.",
    },
  ];

  return (
    <div className="landing-page">
      <Navbar />

      <div className="landing-container">
        <div className="hero-glow"></div>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-badge">
            AI-Powered Evaluation Platform
          </div>

          <h1 className="hero-title">
            Exam<span className="gradient-text">AI</span>
          </h1>

          <p className="hero-subtitle">
            Streamline question paper analysis and answer sheet evaluation
            with intelligent AI assistance. Upload, review and evaluate
            with confidence.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/upload")}
            >
              Upload Question Paper →
            </button>

            <button
              className="secondary-btn"
              onClick={() => {
                const element = document.getElementById("workflow");

                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: "smooth",
                  });
                }
              }}
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Evaluation Workflow */}
        <section id="workflow" className="workflow-section">
          <h2 className="section-title">
            Evaluation Workflow
          </h2>

          <p className="section-subtitle">
            Complete end-to-end AI powered answer sheet evaluation process.
          </p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>

                <h3 className="feature-title">
                  {feature.title}
                </h3>

                <p className="feature-text">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Call To Action */}
        <section className="cta-section">
          <h2 className="cta-title">
            Ready to transform answer sheet evaluation?
          </h2>

          <p className="cta-text">
            Start by uploading a question paper and let Exam AI do the
            heavy lifting.
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/upload")}
          >
            Get Started →
          </button>
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
