import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Exercices from '../screens/Exercices';
import Home from '../screens/Home';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();
function BottomNavigation(): JSX.Element {
  return(
    <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Exercices" component={Exercices} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({});

export default BottomNavigation;