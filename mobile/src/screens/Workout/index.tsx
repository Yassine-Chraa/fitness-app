import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Discover from './Discover';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CurrentProgram from './CurrentProgram';
import theme from '../../constants/theme';
import MyPrograms from './MyPrograms';

const Tab = createMaterialTopTabNavigator();

const Workout = () => {
  return (
    <Tab.Navigator
      initialRouteName="Current"
      tabBar={({state, navigation, position}) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 12,
            marginTop: 16,
          }}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };
            return (
              <TouchableOpacity key={index} onPress={onPress}>
                <Text
                  style={{
                    ...styles.link,
                    color: isFocused
                      ? theme.colors.primary
                      : theme.colors.button,
                  }}>
                  {route.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}>
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Current" component={CurrentProgram} />
      <Tab.Screen name="My Programs" component={MyPrograms} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  link: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Workout;
