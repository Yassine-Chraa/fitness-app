import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import Exercices from '../screens/Exercices';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
function TabNavigation(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home';
              break;
            case 'Exercices':
              iconName = focused ? 'dumbbell' : 'dumbbell';
              break;
            case 'Settings':
              iconName = focused ? 'cog' : 'cog';
              break;
            default:
              iconName = focused ? '' : '';
              break;
          }
          // You can return any component that you like here!
          return <Icon name={iconName} size={20} color={color} />;
        },
        headerShown: false
      })}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Exercices" component={Exercices} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

export default TabNavigation;
