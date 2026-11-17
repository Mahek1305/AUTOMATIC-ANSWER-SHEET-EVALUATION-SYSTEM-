import FileUploader from "../components/FileUploader.jsx";
import Navbar from "../components/Navbar.jsx";
import WorkflowStepper from "../components/WorkflowStepper.jsx";
import { useEffect, useRef } from "react";

function UploadPage() {
  // Send a health request to QP-parsing in case the service shuts down.
  const hasFetched = useRef(false);

    useEffect(() => {
      // Prevent React Strict Mode from running this twice in development
      if (hasFetched.current) return;
      hasFetched.current = true;

      const wakeupService = async () => {
        try {
          const res = await fetch('/api/wakeup');
          const data = await res.json();

          // Check the status property from your API JSON response
          if (data.status === 'Pinged') {
            console.log("Service started again. After 1 minute the service will wake up.");
          }
        } catch (err) {
          console.error("Failed to wake up services:", err);
        }
      };

      wakeupService();
    }, []);
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", transition: "background 0.3s ease" }}>
      <Navbar />
      <WorkflowStepper currentStep={1} currentPageName="Upload Question Paper" />
      
      {/* Standardized Left-Aligned Page Header */}
      <div style={styles.pageHeader}>
        <h1 style={styles.pageTitle}>Step 1: Upload Question Paper</h1>
        <p style={styles.pageSubtitle}>
          Upload your exam PDF or images for automated AI parsing and rubric generation.
        </p>
        <br />
        <p style={styles.pageSubtitle}>Please Note that question papers with more than 15 pages with too much text like question papers with many big paragraphs,
          case studies etc might give errors due to exhaustion of gemini tokens. We are sorry for the trouble!
        </p>
      </div>

      <FileUploader />
    </div>
  );
}

const styles = {
  pageHeader: {
    maxWidth: "1280px",
    width: "100%",
    margin: "10px auto 24px auto",
    padding: "0 40px",
    boxSizing: "border-box",
    textAlign: "center",
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "var(--text-h)",
    margin: 0,
  },
  pageSubtitle: {
    fontSize: "15px",
    color: "var(--text-muted)",
    margin: "8px 0 0 0",
    lineHeight: "1.5",
  },
};

export default UploadPage;