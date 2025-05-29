import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ساخت کانتکست تم
const ThemeContext = createContext();

// هوک سفارشی برای استفاده از تم
export const useTheme = () => useContext(ThemeContext);

// Provider تم برای پوشش اپ
export function ThemeProvider({ children }) {
  const [isLargeText, setIsLargeText] = useState(false);

  // بارگذاری تنظیمات از AsyncStorage
  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem("isLargeText");
      if (stored) {
        setIsLargeText(JSON.parse(stored));
      }
    };
    load();
  }, []);

  return (
    <ThemeContext.Provider value={{ isLargeText, setIsLargeText }}>
      {children}
    </ThemeContext.Provider>
  );
}
