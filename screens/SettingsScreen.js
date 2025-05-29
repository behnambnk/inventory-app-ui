import { Text, Switch, View, StyleSheet } from "react-native";
import { GlobalLayout } from "../components/Layout";
import { useTheme } from "../context/theme";
import { GlobalStyles } from "../styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

export default function SettingsScreen() {
  const { isLargeText, setIsLargeText } = useTheme();
  const globalStyles = GlobalStyles();

  return (
    <GlobalLayout>
      <View style={styles.row}>
        <Feather name="type" size={24} color="#4f6d7a" />
        <Text style={[globalStyles.text, styles.label]}>Large Text</Text>
        <Switch
          value={isLargeText}
          onValueChange={async () => {
            await AsyncStorage.setItem("isLargeText", JSON.stringify(!isLargeText));
            setIsLargeText(!isLargeText);
          }}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
      </View>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginTop: 20,
  },
  label: {
    flex: 1,
  },
});
