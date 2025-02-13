import axios from "axios";

const API_URL = "http://localhost:3000/api/electricityUsage";

// sends data to API 
export const calculateElectricity = async (data: any) => {
  try {
    const response = await axios.post(`${API_URL}`, data);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Electricity API Error:", error);
    throw error;
  }
};
