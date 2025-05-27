import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { GlobalLayout } from "../components/Layout";

export default function ItemScreen() {
  const { id } = useRoute().params;
  const navigation = useNavigation();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching item with ID:", id);
    const fetchItem = async () => {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/items/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_BASE_TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setItem(data);
          navigation.setOptions({ title: "Item Details" }); // set screen header
        } else {
          console.error("Failed to fetch item", await response.text());
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <GlobalLayout>
        <ActivityIndicator size="large" />
      </GlobalLayout>
    );
  }

  if (!item) {
    return (
      <GlobalLayout>
        <Text style={styles.error}>Item not found</Text>
      </GlobalLayout>
    );
  }

  return (
    <GlobalLayout>
      <View style={styles.container}>
        <Text style={styles.label}>Price</Text>
        <Text style={styles.value}>${item.price}</Text>

        <Text style={styles.label}>Age</Text>
        <Text style={styles.value}>{item.age}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.description}>{item.description || "No description provided."}</Text>
      </View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
  },
  description: {
    fontSize: 15,
    marginTop: 8,
    color: "#666",
  },
  error: {
    fontSize: 18,
    color: "red",
    padding: 16,
  },
});