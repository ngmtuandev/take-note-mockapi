import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/Register';
import Login from './src/Login';
import NoteHome from './src/NoteHome';

const Stack = createNativeStackNavigator();


export default function App() {
    return ( 
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Register'>
                <Stack.Screen name="Register" options={{headerShown: false}} component={Register} />
                <Stack.Screen name="Login" options={{headerShown: false}}  component={Login} />
                <Stack.Screen name="Notehome" component={NoteHome} options={{headerShown: false}}  />
            </Stack.Navigator>
        </NavigationContainer>
    );
}