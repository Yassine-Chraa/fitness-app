import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import Exercices from '../screens/Exercices';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Workout from '../screens/Workout';
import Store from '../screens/Store';
import Food from '../screens/Food';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Exercices':
              iconName = 'dumbbell';
              break;
            case 'Workout':
              iconName = 'list-alt';
              break;
            case 'Store':
              iconName = 'store';
              break;
            case 'Food':
              iconName = 'utensils';
              break;
            case 'Profile':
              iconName = 'user';
              break;
            default:
              iconName = focused ? '' : '';
              break;
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} solid />;
        },
        headerShown: false,
      })}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Workout" component={Workout} />
      <Tab.Screen name="Exercices" component={Exercices} />
      <Tab.Screen name="Store" component={Store} />
      <Tab.Screen name="Food" component={Food} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
