import { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Screen from '../../components/Screen';
import MyCartCard from '../../components/Cards/MyCartCard';
import theme from '../../constants/theme';
import { useCart } from '../../context/providers/CartContextProvider';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { useDailyNutrition } from '../../context/providers/DailyNutritionProvider';
import DailyNutritionCard from '../../components/Cards/DailyNutritionCard';


const DailyNutrition = () => {
  const {dailyNutrition,getDailyNutrition} = useDailyNutrition();

  useEffect(() => {
    getDailyNutrition(1, '2023-03-12');
  }, [])

  return (
    <Screen name="Daily Nutrition" backButton noAction>
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={dailyNutrition.history_items}
        renderItem={({ item }: any) => <DailyNutritionCard item={item} />}
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
});
export default DailyNutrition;
