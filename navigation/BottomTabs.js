import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import ItemsStack from "../ItemsStack";
import PhotoFormScreen from "../screens/PhotoFormScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
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
