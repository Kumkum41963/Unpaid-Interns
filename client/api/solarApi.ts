import axios from "axios";

const API_URL = "https://your-backend-api.com";

export const calculateSolarEnergy = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/solar/calculate`, data);
    return response.data;
  } catch (error) {
    console.error("Solar API Error:", error);
    throw error;
  }
};
