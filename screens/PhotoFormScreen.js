import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as FileSystem from "expo-file-system";
import { Picker } from "@react-native-picker/picker";
import { GlobalLayout } from "../components/Layout";

export default function PhotoFormScreen() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    price: "",
    description: "",
    categoryId: "",
    longitude: "",
    latitude: "",
  });
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/categories`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_BASE_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCategories(data); // expect: [{ id, name }] or similar
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      Alert.alert("Error", "Unable to fetch categories");
    }
  };

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
      Alert.alert("Permission required", "Camera access is needed");
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    } else {
      Alert.alert("Permission required", "Location access is needed");
    }
  };

  const cachePhoto = async (itemName, uri) => {
    try {
      const ext = uri.split(".").pop();
      const dest = `${FileSystem.cacheDirectory}${itemName}.${ext}`;
      await FileSystem.copyAsync({ from: uri, to: dest });
      console.log("Photo cached at", dest);
    } catch (err) {
      console.warn("Could not cache photo:", err);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !photo || !location) {
      Alert.alert("Missing data", "Please complete the form, take a photo, and get location.");
      return;
    }

    try {
      const payload = {
        ...form,
        age: parseInt(form.age),
        price: parseFloat(form.price),
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const res = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/items`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_BASE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const { _id } = await res.json();
        console.log("Item created with ID:", _id);
        await cachePhoto(_id, photo);
        Alert.alert("Success", "Item submitted successfully!");
        setForm({ name: "", age: "", price: "", description: "", category: "" });
        setPhoto(null);
        setLocation(null);
      } else {
        Alert.alert("Error", "Submission failed");
      }
    } catch (err) {
      console.error("Submit error:", err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <GlobalLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Age</Text>
          <TextInput keyboardType="numeric" style={styles.input} value={form.age} onChangeText={(v) => setForm({ ...form, age: v })} />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Price</Text>
          <TextInput keyboardType="numeric" style={styles.input} value={form.price} onChangeText={(v) => setForm({ ...form, price: v })} />
        </View>

        <View style={styles.card}>  
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} multiline value={form.description} onChangeText={(v) => setForm({ ...form, description: v })} />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Category</Text>
          <Picker selectedValue={form.categoryId} onValueChange={(v) => setForm({ ...form, categoryId: v })}>
            <Picker.Item label="Select Category" value="" />
            {categories.map((c) => (
              <Picker.Item key={c._id} label={c.name} value={c._id} />
            ))}
          </Picker>
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
    backgroundColor: "#f9f9f9",
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
