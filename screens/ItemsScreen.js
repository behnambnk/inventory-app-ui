import { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { GlobalLayout } from "../components/Layout";
import { GlobalStyles } from "../styles/global";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function ItemsScreen() {
  const [items, setItems] = useState([]);
  const [headline, setHeadline] = useState("Loading...");
  const globalStyles = GlobalStyles();
  const navigation = useNavigation();

  const handleItemPress = (item) => {
    navigation.navigate('Item', { id: item._id });
  };

  const fetchItems = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BASE_URL}/api/items`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_BASE_TOKEN}`,
        "Content-Type": "application/json",  
      }
    });
    if (response.ok) {
      const data = await response.json();
      setItems(data.items);
      console.log("Items fetchedd successfullyy:", data.items);
    } else {
      setHeadline("Failed to fetch headlines.");
      console.error("Error fetching items:", response);
    }
    
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <GlobalLayout>
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.headerCell]}>Name</Text>
        <Text style={[styles.cell, styles.headerCell]}>Price</Text>
        <Text style={[styles.cell, styles.headerCell]}>Age</Text>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> handleItemPress(item)} style={styles.touchable}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.price}</Text>
            <Text style={styles.cell}>{item.age}</Text>
            <Feather name="chevron-right" size={20} color="#999" style={styles.icon} />
          </TouchableOpacity>
        )}
      />
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  touchable: {
    height: "100%",
    justifyContent: "center",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#4f6d7a",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  touchable: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 15,
    color: "#333",
  },
});