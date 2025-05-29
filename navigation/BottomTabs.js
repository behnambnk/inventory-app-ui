import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import ItemsStack from "../ItemsStack";
import SettingsScreen from "../screens/SettingsScreen";
import CameraScreen from "../screens/CameraScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SensorsScreen from "../screens/SensorsScreen";

import * as Notifications from "expo-notifications";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  // OPTIONAL: Handle notifications globally
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log("📩 Notification received:", notification);
    });
    return () => subscription.remove();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#4f6d7a" },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#cfd8dc",
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Items":
              iconName = "boxes";
              break;
            case "Camera":
              iconName = "camera";
              break;
            case "Notifications":
              iconName = "bell";
              break;
            case "Sensors":
              iconName = "mobile-alt";
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
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Sensors" component={SensorsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
