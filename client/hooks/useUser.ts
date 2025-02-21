import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserDetails = () => {
  const [user, setUser] = useState<{ green_points: number } | null>(null);

  const fetchUserDetails = async () => {
    const email = await AsyncStorage.getItem("userEmail");
    if (!email) return;

    try {
      const response = await fetch(`http://192.168.29.55:3000/api/user/${email}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    // fetchUserDetails();
  }, []);

  return user;
};