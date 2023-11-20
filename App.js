import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./src/Register";
import Login from "./src/Login";
import NoteHome from "./src/NoteHome";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoteWithRedux from "./src/NoteWithRedux";
import reducerTasks from "./src/store/reducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    (async () => {
      const checkLogin = await AsyncStorage.getItem("user");
      if (checkLogin) {
        setIsLogin(true);
      }
    })();
  }, []);

  const store = createStore(reducerTasks);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLogin ? (
          <Stack.Navigator initialRouteName="NoteHome">
            <Stack.Screen
              name="Notehome"
              component={NoteWithRedux}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Register"
              options={{ headerShown: false }}
              component={Register}
            />
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={Login}
            />
            <Stack.Screen
              name="Notehome"
              component={NoteWithRedux}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}
