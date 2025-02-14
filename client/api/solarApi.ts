import axios from "axios";
import { Alert } from "react-native";

const API_URL = "http://exp://192.168.0.104:8081/api/solarPotential"; // ✅ Replace `localhost`

export const calculateSolarEnergy = async (data: any) => {
    try {
        console.log("Sending Data:", data);
        const response = await axios.post(API_URL, data);
        console.log("API Response:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Solar API Error:", error);

        if (error.response) {
            console.error("Response Data:", error.response.data);
            console.error("Status Code:", error.response.status);
            Alert.alert("Error", `Server Error: ${error.response.data.message || "Something went wrong!"}`);
        } else if (error.request) {
            console.error("No Response Received:", error.request);
            Alert.alert("Error", "No response from the server. Check your backend.");
        } else {
            console.error("Axios Setup Error:", error.message);
            Alert.alert("Error", "Could not send request. Check your network and API URL.");
        }

        throw error;
    }
};
