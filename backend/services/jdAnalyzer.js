const skillsDatabase = require("../utils/skillsDatabase");

const extractJDSkills = (text) => {

    const lowerText = text.toLowerCase();

    return skillsDatabase.filter((skill) => lowerText.includes(skill.toLowerCase()))
};

const extractJDEducation = (text) => {
    const educationKeywords = [
        "bachelor",
        "master",
        "b.tech",
        "m.tech",
        "bsc",
        "msc",
        "mba"
    ];

    const lowerText = text.toLowerCase();

    return (
        educationKeywords.find((keyword) => lowerText.includes(keyword)) || ""
    );
};

const extractJDExperience = (text) => {
    const regex = /(\d+)\s*[-–]?\s*(\d+)?\s*(years?|yrs?)/i;

    const match = text.match(regex);

    return match ? match[0] : "";
};

const extractKeywords = (text) => {

        const stopWords = [
        "the",
        "and",
        "for",
        "with",
        "you",
        "will",
        "are",
        "must",
        "have",
        "our",
        "from",
        "this",
        "that",
        "your",
        "using",
        "experience",
        "required",
        "preferred",
        "skills"
    ];

    const words = text
        .toLowerCase()
        .replace(/[^\w\s.+#-]/g, "")
        .split(/\s+/);

    return [
        ...new Set(
            words.filter(
                word =>
                    word.length > 2 && !stopWords.includes(word)
            )
        )
    ];
};

const analyzeJD = (text) => {

    const dbSkills = extractJDSkills(text);

    const keywords = extractKeywords(text);

    return {
        skills: extractJDSkills(text),

        education: extractJDEducation(text),

        experience: extractJDExperience(text), 
        keywords: extractKeywords(text)
    };
};

module.exports = { analyzeJD };