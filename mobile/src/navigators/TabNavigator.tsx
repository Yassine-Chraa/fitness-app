import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import Exercices from '../screens/Exercices';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Workout from '../screens/Workout';
import Store from '../screens/Store';
import Restaurant from '../screens/Restaurant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/providers/AuthContextProvider';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const {isLogged} = useAuth();
  const [data, setData] = useState();
  const getCurrentUser = () => {
    AsyncStorage.getItem('current_user')
      .then((res: any) => {
        setData(res);
      })
      .catch((e: any) => console.log(e));
  };
  useEffect(()=>{
    getCurrentUser();
  },[isLogged])
  const currentUser = data != null ? JSON.parse(data) : null;
  if (currentUser) {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
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
            return <Icon name={iconName} size={size} color={color} solid />;
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
  } else {
    return <></>;
  }
};

export default TabNavigator;
