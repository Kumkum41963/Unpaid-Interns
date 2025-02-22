import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserDetails = () => {
  const [user, setUser] = useState<any>(null);

  const fetchUserDetails = async () => {
    const email = await AsyncStorage.getItem("userEmail");
    if (!email) return;

    try {
      const response = await fetch(`https://backend-amber-nine-53.vercel.app/api/user/${email}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return user;
};