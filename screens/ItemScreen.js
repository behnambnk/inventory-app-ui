import { useEffect, useState, useLayoutEffect } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Animated,
    Share,
    TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { GlobalLayout } from "../components/Layout";
import { Feather } from "@expo/vector-icons";
import PageHeader from "../components/PageHeader";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Linking from "expo-linking";


export default function ItemScreen() {
    const { id } = useRoute().params;
    const navigation = useNavigation();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [imageUri, setImageUri] = useState(null);

    const handleShare = async () => {
        try {
            const url = Linking.createURL(`/item/${item._id}`);
            await Share.share({
                message: url,
            });
        } catch (error) {
            alert("Error sharing item: " + error.message);
        }
    };
    useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate("ItemsList");
                }
              }}
              style={{ paddingHorizontal: 12 }}
            >
              <Text style={{ fontSize: 20, color: '#4f6d7a' }}>←</Text>
            </TouchableOpacity>
          ),
        });
      }, [navigation]);

    useEffect(() => {
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
                    navigation.setOptions({ title: "Item Details" });
                    const imagePath = `${FileSystem.cacheDirectory}${data._id}.jpg`;
                    const info = await FileSystem.getInfoAsync(imagePath);
                    if (info.exists) {
                        setImageUri(info.uri);
                    }

                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }).start();
                }
            } catch (error) {
                console.error("Error:", error);
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
                <PageHeader title="Item Details" />
                <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                    <View style={[styles.row, { justifyContent: "space-between" }]}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <Feather name="dollar-sign" size={18} color="#4f6d7a" />
                            <Text style={styles.label}>Price:</Text>
                            <Text style={styles.value}>${item.price}</Text>
                        </View>
                        <Feather
                            name="share-2"
                            size={20}
                            color="#4f6d7a"
                            onPress={handleShare}
                        />
                    </View>

                    <View style={styles.row}>
                        <Feather name="calendar" size={18} color="#4f6d7a" />
                        <Text style={styles.label}>Age:</Text>
                        <Text style={styles.value}>{item.age}</Text>
                    </View>

                    <View style={styles.row}>
                        <Feather name="info" size={18} color="#4f6d7a" />
                        <Text style={styles.label}>Description:</Text>
                    </View>
                    <Text style={styles.description}>{item.description || "No description provided."}</Text>
                    {imageUri && (
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    )}
                    <View style={styles.row}>
                        <Feather name="map-pin" size={18} color="#4f6d7a" />
                        <Text style={styles.label}>Latitude:</Text>
                        <Text style={styles.value}>{item.latitude || "N/A"}</Text>
                    </View>

                    <View style={styles.row}>
                        <Feather name="map-pin" size={18} color="#4f6d7a" />
                        <Text style={styles.label}>Longitude:</Text>
                        <Text style={styles.value}>{item.longitude || "N/A"}</Text>
                    </View>
                </Animated.View>
        </GlobalLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    value: {
        fontSize: 16,
        color: "#555",
    },
    description: {
        marginTop: 6,
        fontSize: 15,
        color: "#666",
    },
    error: {
        fontSize: 18,
        color: "red",
        padding: 16,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 16,
    }
});
