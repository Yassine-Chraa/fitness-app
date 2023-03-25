import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import theme from '../../constants/theme';
import Cloths from './Cloths';
import Gainers from './Gainers';

const Tab = createMaterialTopTabNavigator();

const Store = () => {
  return (
    <Tab.Navigator
      initialRouteName="Cloths"
      tabBar={({state, navigation}) => (
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
      <Tab.Screen name="Cloths" component={Cloths} />
      <Tab.Screen name="Gainers" component={Gainers} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  link: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default Store;
