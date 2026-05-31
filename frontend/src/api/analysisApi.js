import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const analyzeResumes = async (resumes, jobDescription) => {
    const formData = new FormData();

    resumes.forEach((file) => {formData.append("resumes", file)});

    formData.append(
        "jobDescription",
        jobDescription
    );

    const response = await axios.post(
        `${API_URL}/api/analyze`, 
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

    );
    

    console.log("API URL:", API_URL);
console.log("Analyze URL:", `${API_URL}/api/analyze`);

    return response.data;
};