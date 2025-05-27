import { StyleSheet } from "react-native";
import { useTheme } from "../context/theme";

export function GlobalStyles() {
  const { isLargeText } = useTheme();

  return StyleSheet.create({
    text: {
      fontSize: isLargeText ? 28 : 16,
    },
  });
}
