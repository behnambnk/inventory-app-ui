import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Root"); // چون Root همون BottomTabs هست
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4f6d7a"
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold"
  }
});
