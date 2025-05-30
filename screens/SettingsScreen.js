import React, { useEffect, useState } from "react";
import {
  Text,
  Switch,
  View,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { GlobalLayout } from "../components/Layout";
import { useTheme } from "../context/theme";
import { GlobalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { Accelerometer } from "expo-sensors";

export default function SettingsScreen() {
  const { isLargeText, setIsLargeText } = useTheme();
  const globalStyles = GlobalStyles();

  const [accelData, setAccelData] = useState({ x: 0, y: 0, z: 0 });
  const [bgColor, setBgColor] = useState("#ffffff");

  const handleTextSizeToggle = async () => {
    await AsyncStorage.setItem("isLargeText", JSON.stringify(!isLargeText));
    setIsLargeText(!isLargeText);
  };

  const sendNotification = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Cannot show notifications.");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Inventory Reminder 📦",
        body: "Don't forget to check your stock levels today!",
      },
      trigger: { seconds: 2 },
    });
  };

  useEffect(() => {
    const subscription = Accelerometer.addListener(data => {
      setAccelData(data);
      const { x, y, z } = data;

      if (Math.abs(z) > 1.5) {
        setBgColor("#ff8a80");
      } else if (Math.abs(x) > 1.2) {
        setBgColor("#82b1ff");
      } else if (Math.abs(y) > 1.2) {
        setBgColor("#a5d6a7");
      } else {
        setBgColor("#ffffff");
      }
    });

    Accelerometer.setUpdateInterval(300);
    return () => subscription.remove();
  }, []);

  return (
    <GlobalLayout>
      <View style={styles.section}>
        <View style={styles.row}>
          <Feather name="type" size={24} color="#4f6d7a" />
          <Text style={[globalStyles.text, styles.label]}>Large Text</Text>
          <Switch
            value={isLargeText}
            onValueChange={handleTextSizeToggle}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Send Test Notification</Text>
        <Button title="Send Notification" onPress={sendNotification} color="#4f6d7a" />
      </View>

      <View style={[styles.section, { backgroundColor: bgColor }]}>
        <Text style={styles.sectionTitle}>Accelerometer</Text>
        <Text>X: {accelData.x.toFixed(2)}</Text>
        <Text>Y: {accelData.y.toFixed(2)}</Text>
        <Text>Z: {accelData.z.toFixed(2)}</Text>
      </View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4f6d7a",
  },
});
