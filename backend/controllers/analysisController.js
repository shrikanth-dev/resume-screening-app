const path = require("path");

const { parseResume } = require("../services/resumeParser");
const { analyzeJD } = require("../services/jdAnalyzer");
const { scoreCandidate, rankCandidates } = require("../services/scoringService");
const { saveCandidate } = require("../models/candidateModel");

const analyzeResumes = async (req, res) => {
    try {
        const { jobDescription } = req.body;

        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({message: "No resumes uploaded"});
        }

        if (!jobDescription) {
            return res.status(400).json({message: "Job Description is required"});
        }

        const jdData = analyzeJD(jobDescription);
        const results = [];

        for (const file of files) {
            const filePath = path.join(file.path);

            const resumeData = await parseResume(filePath);

            const scoreData = scoreCandidate(resumeData, jdData);

            results.push({
                name: resumeData.name,
                email: resumeData.email,
                score: scoreData.score,
                level: scoreData.level,
                matchedSkills: scoreData.matchedSkills,
                missingSkills: scoreData.missingSkills,
                resumeFile: file.filename,
                resumeUrl: `http://localhost:5000/uploads/${file.filename}`
            });
        }

        const rankedCandidates = rankCandidates(results);

        for (const candidate of rankedCandidates) {
            await saveCandidate(candidate);
        }

        return res.status(200).json({
            success: true,
            totalCandidates: rankedCandidates.length,
            candidates: rankedCandidates
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { analyzeResumes };