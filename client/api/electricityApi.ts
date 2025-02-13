import axios from "axios";

const API_URL = "https://your-backend-api.com";

export const calculateElectricity = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}/electricity/calculate`, data);
    return response.data;
  } catch (error) {
    console.error("Electricity API Error:", error);
    throw error;
  }
};
