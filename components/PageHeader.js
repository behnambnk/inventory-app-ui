import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PageHeader({ title }) {
  return (
    <View style={styles.header}>
      <Feather name="box" size={20} color="#fff" />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4f6d7a",
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

