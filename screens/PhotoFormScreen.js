import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { GlobalLayout } from "../components/Layout";

export default function PhotoFormScreen() {
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.5,
        base64: false,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } else {
      alert("Camera permission is required.");
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    } else {
      alert("Location permission is required.");
    }
  };

  const handleSubmit = () => {
    console.log("Title:", title);
    console.log("Photo URI:", photo);
    console.log("Location:", location);
    alert("Submitted! Check console for details.");
  };

  return (
    <GlobalLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            placeholder="Enter item title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.card}>
          <Button title="Take a Photo" onPress={takePhoto} />
          {photo && <Image source={{ uri: photo }} style={styles.image} />}
        </View>

        <View style={styles.card}>
          <Button title="Get Location" onPress={getLocation} />
          {location && (
            <Text style={styles.locationText}>
              Lat: {location.latitude}, Lon: {location.longitude}
            </Text>
          )}
        </View>

        <View style={styles.card}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginTop: 12,
  },
  locationText: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
});
