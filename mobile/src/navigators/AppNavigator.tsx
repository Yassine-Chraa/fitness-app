import {useState} from 'react';
import {
  StatusBar,
  useColorScheme,
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();
function AppNavigator(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}>
      <Stack.Screen name="Tab" component={TabNavigator} />
    </Stack.Navigator>
  );
}
export default AppNavigator;
