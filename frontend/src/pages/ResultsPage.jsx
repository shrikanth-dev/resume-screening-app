import { useState, useContext } from "react";

import ResultsHeader from "../components/ResultsHeader";
import ResultsControls from "../components/ResultsControls";
import CandidateTable from "../components/CandidateTable";

import { ResultsContext } from "../context/ResultsContext";
import { exportCSV } from "../api/exportApi";

import "../styles/results.css";

function ResultsPage() {
  const [search, setSearch] = useState("");

  const { results } = useContext(ResultsContext);

    const handleExport = async () => {
    try {
      const blob = await exportCSV(results);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "candidate-results.csv";

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.error(error);
      alert("Export Failed");
    }
  };


  const candidates = results;

  return (
    <div className="results-page">
      <ResultsHeader />

      <div className="results-section">
        <h1>Screening Results</h1>
        <p>
          {candidates.length} resumes analyzed for the given job description.
        </p>
      </div>

      <ResultsControls 
      search={search}
      setSearch={setSearch}
      onExport={handleExport}
      />

      <CandidateTable
      candidates={candidates}
      search={search}
      />
    </div>
  );
}

export default ResultsPage;