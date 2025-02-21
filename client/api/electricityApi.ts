import axios from "axios";

const API_URL = "https://backend-amber-nine-53.vercel.app/api/api/electricityUsage";

export const calculateElectricity = async (data: any) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
    
  } catch (error) {
    console.error("Electricity API Error:", error);
    throw error;
  }
};