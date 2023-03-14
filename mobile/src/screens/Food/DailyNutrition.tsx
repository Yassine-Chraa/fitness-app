import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import { useDailyNutrition } from '../../context/providers/DailyNutritionProvider';
import DailyNutritionCard from '../../components/Cards/DailyNutritionCard';
import { useAuth } from '../../context/providers/AuthContextProvider';


const DailyNutrition = () => {
  const {currentUser} = useAuth();
  const { dailyNutrition, forceUpdate, getDailyNutrition } = useDailyNutrition();

  useEffect(() => {
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() < 9 ? '0' : ''}${now.getMonth() + 1}-${now.getDate()}`;
    getDailyNutrition(currentUser?.user.id, today);
  }, [forceUpdate])

  return (
    <Screen name="Daily Nutrition" backButton noAction>
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={dailyNutrition.history_items}
        renderItem={({ item }: any) => <DailyNutritionCard daily_nutrition_id={1} item={item} />}
        ListHeaderComponent={() => {
          return (
            <View
              style={{
                marginTop: 8,
                marginBottom: 32,
                marginHorizontal: 4,
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderRadius: 8,
                backgroundColor: theme.colors.text,
                elevation: 4,
                rowGap: 4
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{ ...styles.footerText, color: theme.colors.background }}>Energy</Text>
                <Text style={{ ...styles.footerText, color: theme.colors.customCard }}>{dailyNutrition.energy_consumed?.toFixed(1) + ' kcal'}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{ ...styles.footerText, color: theme.colors.background }}>Protein</Text>
                <Text style={{ ...styles.footerText, color: theme.colors.customCard }}>{dailyNutrition.protein_consumed?.toFixed(2) + ' g'}</Text>
              </View>
            </View>
          );
        }}
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
