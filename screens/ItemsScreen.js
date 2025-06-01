import { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { GlobalLayout } from "../components/Layout";
import { GlobalStyles } from "../styles/global";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import PageHeader from "../components/PageHeader";
import { Swipeable } from 'react-native-gesture-handler';

export default function ItemsScreen() {
  const [items, setItems] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const globalStyles = GlobalStyles();
  const navigation = useNavigation();

  const handleItemPress = (item) => {
    navigation.navigate("Item", { id: item._id });
  };

  const renderRightActions = (onDelete) => (
    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <Feather name="trash" size={20} color="white" />
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );
  
  const SwipeableItem = ({ item, onDelete, onPress }) => (
    <Swipeable renderRightActions={() => renderRightActions(() => onDelete(item._id))}>
      <TouchableOpacity onPress={() => onPress(item._id)} style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.title || 'Untitled Item'}</Text>
      </TouchableOpacity>
    </Swipeable>
  );

  const fetchItems = async () => {
    try {
      console.log("Fetching items...");
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/api/items`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.EXPO_PUBLIC_BASE_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data.items.length);
        setItems(data.items);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      } else {
        console.error("Error fetching items:", await response.text());
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [])
  );

  return (
    <GlobalLayout>
      <PageHeader title="Items List" />
      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.headerCell]}>Name</Text>
        <Text style={[styles.cell, styles.headerCell]}>Price</Text>
        <Text style={[styles.cell, styles.headerCell]}>Age</Text>
      </View>

      <Animated.View style={{ opacity: fadeAnim }}>
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleItemPress(item)}
              style={styles.row}
            >
              <Feather name="tag" size={18} color="#4f6d7a" style={styles.icon} />
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>${item.price}</Text>
              <Text style={styles.cell}>{item.age}</Text>
              <Feather name="chevron-right" size={20} color="#999" style={styles.arrow} />
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
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
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  arrow: {
    marginLeft: "auto",
  },
  cell: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    textAlign: "center",
  },
});
