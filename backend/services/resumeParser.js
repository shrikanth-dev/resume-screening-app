const fs = require("fs");
const pdfParse = require("pdf-parse");
const path = require("path");
const mammoth = require("mammoth");


const skillsDatabase = require("../utils/skillsDatabase");


const extractPDFText = async (filePath) => {
    const buffer = fs.readFileSync(filePath);

    const data = await pdfParse(buffer);

    return data.text;
};

const extractDOCXText = async (filePath) => {
    const result = await mammoth.extractRawText({
        path: filePath
    });

    return result.value;
}

const extractText = async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === ".pdf") {
        return await extractPDFText(filePath);
    }

    if (ext === ".docx" || ext === ".doc") {
        return await extractDOCXText(filePath);
    }
    
    throw new Error(
        "Unsupported file format"
    );
};

const extractEmail = (text) => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

    const match = text.match(emailRegex);

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
        .split(/\s+/)
        .filter(Boolean);

    return [
        ...new Set(
            words.filter(
                word =>
                    word.length > 2 && !stopWords.includes(word)
            )
        )
    ];
};

const extractSkills = (text) => {
    
    const lowerText = text.toLowerCase();

    return skillsDatabase.filter((skill) => lowerText.includes(skill.toLowerCase()));
}

const extractName = (text) => {
    const lines = text
    .split("\n")
    .filter((line) =>line.trim() !== "");

    return lines[0] || "unknown";
};

const extractEducation = (text) => {
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

    return educationKeywords.find((keyword) => lowerText.includes(keyword)) || ""
};

const extractExperience = (text) => {
    const regex = /(\d+)\+?\s*(years?|yrs?)/i;

    const match = text.match(regex);

    return match ? match[0] : "";
};

const parseResume = async (filePath) => {
    const text = await extractText(filePath);

    const dbSkills = extractSkills(text);
    const keywords = extractKeywords(text);

    return {
        name: extractName(text),
        email: extractEmail(text),
        skills: extractSkills(text),
        education: extractEducation(text),
        experience: extractExperience(text),
        text
    };
};

module.exports = {parseResume};