import { useNavigate } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
function ResultsHeader() {

    const navigate = useNavigate();

    return (
        <div className="results-topbar">
            <div className="logo">
                <FaFileAlt />
                Resume Screener
            </div>

            <button className="upload-new-btn"
            onClick={() => navigate("/")}
            >
                <FiUploadCloud />
                Upload New
            </button>
        </div>
    );
}

export default ResultsHeader;