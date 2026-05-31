import { FiEye } from "react-icons/fi";

function CandidateTable({
  candidates,
  search
}) {

  const filtered = candidates.filter(
    (candidate) =>
      candidate.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const getInitials = (name) => {
    return name 
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  };

  return (
    <div className="table-wrapper">

      <table className="candidate-table">

        <thead>

          <tr>
            <th>Rank</th>
            <th>Candidate</th>
            <th>Match Score</th>
            <th>Key Matching Skills</th>
            <th>Missing Skills</th>
            <th>Resume</th>
          </tr>

        </thead>

        <tbody>

          {filtered.map((candidate) => (

            <tr key={candidate.rank}>

              <td>
                {candidate.rank}
              </td>

              <td>

                <div className="candidate-info">

                  <div className="avatar">
                    {getInitials(candidate.name)}
                  </div>

                  <div>

                    <div className="candidate-details">
                      <h4>{candidate.name}</h4>
                      <p>{candidate.email}</p>
                    </div>

                  </div>

                </div>

              </td>

              <td>

                <div className="score-container">
                  <span
                    className={`score-badge ${
                      candidate.level
                        .toLowerCase()
                        .replace(" ", "-")
                    }`}
                  >
                    {candidate.score}%
                  </span>

                  <span
                    className={`score-level ${
                      candidate.level
                        .toLowerCase()
                        .replace(" ", "-")
                    }`}
                  >
                    {candidate.level}
                  </span>
                </div>

              </td>

              <td>

                {(candidate.matchedSkills || []).map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="skill-tag"
                    >
                      {skill}
                    </span>
                  )
                )}

              </td>

              <td>

                {(candidate.missingSkills || []).map(
                  (skill, index) => (
                    <span
                      key={index}
                      className="missing-tag"
                    >
                      {skill}
                    </span>
                  )
                )}

              </td>

              <td>

                <a
                  href={candidate.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="preview-btn"
                >
                  <FiEye />
                  View Resume
                </a>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <div className="table-footer">

    <div className="results-count">
        Total Results: {filtered.length}
    </div>

    <div className="pagination">

        <button className="page-btn" disabled>
            &lt;
        </button>

        <button className="page-btn active-page">
            1
        </button>

        <button className="page-btn" disabled>
            &gt;
        </button>

    </div>

</div>

    </div>
  );
}

export default CandidateTable;