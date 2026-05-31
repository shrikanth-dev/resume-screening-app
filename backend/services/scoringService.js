const calculateSkillsScore = (resumeSkills, jdSkills) => {
    if (jdSkills.length === 0) return 100;

    const matchedSkills = resumeSkills.filter((skill) => jdSkills.includes(skill));

    return (matchedSkills.length / jdSkills.length) * 100;
};

const calculateExperienceScore = (resumeExp, jdExp) => {
    const resumeYears = parseInt(resumeExp) || 0;

    const jdYears = parseInt(jdExp) || 0;

    if (jdYears <= 1) return 100;

    if (resumeYears >= jdYears) return 100;

    return (resumeYears / jdYears) * 100;
};


const calculateEducationScore = (resumeEducation, jdEducation) => {
    if (!jdEducation) return 100;

    const resume = resumeEducation.toLowerCase();

    const jd = jdEducation.toLowerCase();

    const bachelorGroup = [
        "bachelor",
        "b.tech",
        "bsc"
    ];

    const masterGroup = [
        "master",
        "m.tech",
        "msc",
        "mba"
    ];

    if (
    bachelorGroup.includes(resume) && bachelorGroup.includes(jd)) {
        return 100;
    }

    if (masterGroup.includes(resume) && masterGroup.includes(jd)) {
        return 100;
    }

  return resume === jd ? 100 : 0;

};

const calculateKeywordScore = (resumeText, jdKeywords) => {
    if (jdKeywords.length === 0) return 100;

    const lowerResume = resumeText.toLowerCase();

    const matches = jdKeywords.filter((keyword) => lowerResume.includes(keyword));

    return (matches.length  / jdKeywords.length) * 100;
};

const getLevel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    return "Fair";
};

const scoreCandidate = (resume, jd) => {
    const skillsScore = calculateSkillsScore(resume.skills, jd.skills);

    const experienceScore = calculateExperienceScore(resume.experience, jd.experience);

    const educationScore = calculateEducationScore(resume.education, jd.education);

    const keywordScore = calculateKeywordScore(resume.text, jd.keywords);

    const finalScore = (
        skillsScore * 0.4 + experienceScore * 0.3 + educationScore * 0.2 + keywordScore * 0.1
    );

    return {
        score: Math.round(finalScore),
        level: getLevel(Math.round(finalScore)),
        matchedSkills: resume.skills.filter((skill) => jd.skills.includes(skill)),
        missingSkills: jd.skills.filter((skill) => !resume.skills.includes(skill))
    };
};

const rankCandidates = (candidates) => {
    return candidates.sort((a, b) => b.score - a.score).map((candidate, index) => ({
        ...candidate,
        rank: index + 1
    }));
};

module.exports = { scoreCandidate, rankCandidates };