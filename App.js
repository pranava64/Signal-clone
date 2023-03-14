import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import AddChatScreen from "./screens/AddChatScreen";
import ChatScreen from "./screens/ChatScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerStyle: { backgroundColor: "#2C6BED" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#2C6BED" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            headerBackTitle: "Back to Login",
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#2C6BED" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="AddChat"
          component={AddChatScreen}
          options={{
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#2C6BED" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: "#2C6BED" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
