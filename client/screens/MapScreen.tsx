import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapScreen: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [vendors, setVendors] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to find vendors.");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      fetchVendors(loc.coords.latitude, loc.coords.longitude);
    })();
  }, []);

  const fetchVendors = async (lat: number, lon: number) => {
    try {
      const response = await fetch(`http://localhost:3000/vendor/nearest-vendor?lat=${lat}&lon=${lon}`);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setVendors([data]);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Failed to fetch vendors";
      Alert.alert("Error", errMsg);
    }    
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={location} title="You are here" pinColor="blue" />
          {vendors.map((vendor, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: vendor.location.coordinates[1], // MongoDB stores [longitude, latitude]
                longitude: vendor.location.coordinates[0],
              }}
              title={vendor.name}
              description={`📍 ${vendor.address.city}, 📞 ${vendor.phone}`}
            />
          ))}
        </MapView>
      ) : (
        <Text>Loading location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default MapScreen;