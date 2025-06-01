import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemsScreen from './screens/ItemsScreen'; // your main items list
import ItemScreen from './screens/ItemScreen'; // item details screen

const Stack = createNativeStackNavigator();

export default function     ItemsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ItemsList" component={ItemsScreen} options={{ headerShown: true, title: "Item Details" }} />
      <Stack.Screen name="Item" component={ItemScreen} /> 
    </Stack.Navigator>
  );
}