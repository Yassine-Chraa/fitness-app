import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import Exercices from '../screens/Exercices';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Workout from '../screens/Workout';
import Store from '../screens/Store';
import Restaurant from '../screens/Restaurant';

const Tab = createBottomTabNavigator();
function TabNavigator(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
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
            case 'Restaurant':
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
          return (
            <Icon name={iconName} size={20} color={color} solid />
          );
        },
        headerShown: false,
      })}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Workout" component={Workout} />
      <Tab.Screen name="Exercices" component={Exercices} />
      <Tab.Screen name="Store" component={Store} />
      <Tab.Screen name="Restaurant" component={Restaurant} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

export default TabNavigator;
