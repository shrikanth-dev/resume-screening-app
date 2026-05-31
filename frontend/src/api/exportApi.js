import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const exportCSV = async (candidates) => {
    const response = await axios.post(
        `${API_URL}/api/export`,
        candidates,
        {
            responseType: "blob"
        }
    );

    return response.data;
};