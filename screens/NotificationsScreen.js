import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { GlobalLayout } from "../components/Layout";

export default function NotificationsScreen() {
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Cannot show notifications.");
      }
    };

    requestPermission();
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Inventory Reminder 📦",
        body: "Don't forget to check your stock levels today!",
      },
      trigger: { seconds: 3 },
    });
  };

  return (
    <GlobalLayout>
      <View style={styles.card}>
        <Text style={styles.title}>Local Notification</Text>
        <Button title="Send Notification" onPress={sendNotification} />
      </View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#4f6d7a",
  },
});
