import { useCallback } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../../constants/theme';
import Cloths from './Cloths';
import Gainers from './Gainers';
import { useProduct } from '../../context/providers/ProductContextProvider';
import { useCategory } from '../../context/providers/CategoryConextProvider';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../context/providers/AuthContextProvider';

const Tab = createMaterialTopTabNavigator();

const Store = () => {
  const { getProducts } = useProduct();
  const { getCategories } = useCategory();
  const updateState = () => {
    getCategories();
    getProducts();
  }
  useFocusEffect(
    useCallback(() => {
      updateState();
    }, [])
  )
  return (
    <Tab.Navigator
      initialRouteName="Cloths"
      tabBar={({ state, navigation }) => (
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
      <Tab.Screen name="Gym Nutrition" component={Gainers} />
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
