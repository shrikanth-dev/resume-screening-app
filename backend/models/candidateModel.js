const pool = require("../config/db");

const saveCandidate = async (candidate) => {
    const query = `INSERT INTO candidates 
    (
    name,
    email,
    score,
    level,
    rank,
    matched_skills,
    missing_skills,
    resume_file
    )
    VALUES
    (
    $1,$2, $3, $4, $5, $6, $7, $8
    )`;

    await pool.query(
        query,
        [
            candidate.name,
            candidate.email,
            candidate.score,
            candidate.level,
            candidate.rank,

            JSON.stringify(candidate.matchedSkills),
            JSON.stringify(candidate.missinngSkills),
            candidate.resumeFile
        ]
    );
};

module.exports = { saveCandidate };