import{ useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ResumeUploader from "../components/ResumeUploader";
import JDUploader from "../components/JDUploader";

import { ResultsContext } from "../context/ResultsContext";
import { analyzeResumes } from "../api/analysisApi";

import "../styles/upload.css";

function UploadPage() {

  const [resumeFiles, setResumeFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [jdFile, setJdFile] = useState(null);

  const navigate = useNavigate();

  const { setResults } = useContext(ResultsContext);

  const handleClearAll = () => {
    setResumeFiles([]);
    setJobDescription("");
    setJdFile(null);
  };

  const handleAnalyze = async () => {
    try {

      if (resumeFiles.length === 0) {
        alert("Please upload at least one resume");
        return ;
      }

      if (!jobDescription.trim() && !jdFile) {
        alert("Please provide a Job Description");
        return ;
      }
    

      navigate("/processing");

      const response = await analyzeResumes(resumeFiles, jobDescription);

      setResults(response.candidates);
      navigate("/results");
    } catch (error) {
      console.error(error);
      alert("Analysis Failed");
      navigate("/");
    }
  };


  return (
    <div className="upload-page">
      
      <Header onClearAll={handleClearAll} />

      <div className="page-header">
        <h1>Resume Screening System</h1>
        <p>
          Upload resumes and a job description to find the best candidates.
        </p>
      </div>

      <div className="main-content">
        <ResumeUploader 
        files={resumeFiles}
        setFiles={setResumeFiles}
        />

        <JDUploader 
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        jdFile={jdFile}
        setJdFile={setJdFile}
        />

      </div>

      <button className="analyze-btn" onClick={handleAnalyze}>
        Analyze Resumes 
      </button>

    </div>
  );
}

export default UploadPage;