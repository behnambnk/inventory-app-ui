import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Accelerometer } from "expo-sensors";
import { GlobalLayout } from "../components/Layout";

export default function SensorsScreen() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [bgColor, setBgColor] = useState("#ffffff");

  useEffect(() => {
    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
      const { x, y, z } = accelerometerData;

      if (Math.abs(z) > 1.5) {
        setBgColor("#ff8a80"); // قرمز
      } else if (Math.abs(x) > 1.2) {
        setBgColor("#82b1ff"); // آبی
      } else if (Math.abs(y) > 1.2) {
        setBgColor("#a5d6a7"); // سبز
      } else {
        setBgColor("#ffffff"); // سفید (حالت عادی)
      }
    });

    Accelerometer.setUpdateInterval(300);

    return () => subscription.remove();
  }, []);

  return (
    <GlobalLayout>
      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <Text style={styles.title}>Accelerometer Data</Text>
        <Text style={styles.value}>X: {data.x.toFixed(2)}</Text>
        <Text style={styles.value}>Y: {data.y.toFixed(2)}</Text>
        <Text style={styles.value}>Z: {data.z.toFixed(2)}</Text>
      </View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  value: {
    fontSize: 16,
    marginBottom: 6,
  },
});
