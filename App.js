import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import NewsScreen from "./screens/NewsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { ThemeProvider } from "./context/theme";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = route.name === "News" ? "newspaper" : "cog";
              return <FontAwesome5 name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="News" component={NewsScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
