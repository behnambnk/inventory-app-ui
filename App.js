import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "./context/theme";
import ItemsStack from "./ItemsStack";
import SettingsScreen from "./screens/SettingsScreen";
import PhotoFormScreen from "./screens/PhotoFormScreen";
import SplashScreen from "./screens/SplashScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function BottomTabs() {
  return (
    <Tab.Navigator
    
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#4f6d7a",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#cfd8dc",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Items":
              iconName = "boxes";
              break;
            case "Form":
              iconName = "plus-circle";
              break;
            case "Settings":
              iconName = "cog";
              break;
            default:
              iconName = "circle";
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Items" component={ItemsStack} />
      <Tab.Screen name="Form" component={PhotoFormScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ThemeProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Root" component={BottomTabs} />
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
