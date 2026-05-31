import { FiSearch, FiDownload } from "react-icons/fi";

function ResultsControls({ search, setSearch, onExport  }) {
    return (
        <div className="results-controls">
            <div className="search-container">
            <FiSearch className="search-icon" />
            <input 
            type="text" 
            placeholder="search candidates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            /> 
            </div>


            <select>
                <option value="">
                    Score(High to low)
                </option>
            </select>
            <button 
            className="export-btn"
            onClick={onExport}
            >
                <FiDownload />
                Export Results
            </button>
        </div>
    );
}

export default ResultsControls;