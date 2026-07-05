import axiosInstance from "./axios.js";

export const sendUserPrompt = async ({ persona, userPrompt }) => {
    try {
        console.log("persona",persona);
        console.log("userPrompt",userPrompt);
        
        const response = await axiosInstance.post('/chat', { persona, userPrompt }, { withCredentials: true })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.response?.data || error.message);
        throw error;
    }
}