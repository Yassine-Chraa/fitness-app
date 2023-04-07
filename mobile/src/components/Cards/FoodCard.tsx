import { Image } from '@rneui/themed';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { useDailyNutrition } from '../../context/providers/DailyNutritionProvider';

const FoodCard = ({ user_id, date, item }: any) => {
  const { addFood } = useDailyNutrition();
  const navigation: any = useNavigation();
  const { foodId, label, image, nutrients, category } = item;

  const addFoodToDailyNutrition = () => {
    var today = new Date();
    var h = (today.getHours() < 10 ? '0' : '') + today.getHours();
    var m = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    var s = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
    const date = `${today.getFullYear()}-${today.getMonth() < 9 ? '0' : ''}${today.getMonth() + 1}-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`;
    addFood(user_id, date, { name: label, api_id: foodId, category: category, poid: 50, energy: nutrients.ENERC_KCAL * 0.5, protein: nutrients.PROCNT * 0.5, fat: nutrients.FAT * 0.5, fiber: nutrients.FIBTG * 0.5, carbohydrate: nutrients.CHOCDF * 0.5, time: `${h}:${m}:${s}` })
  }
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.4}
      onPress={() =>
        navigation.navigate('FoodDetails', {
          item
        })
      }>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 12,
          width: '90%',
        }}>
        <Image
          source={{ uri: image || 'https://placehold.jp/180x260.png' }}
          style={{ height: 80, width: 80, borderRadius: 5 }}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="cover"
        />
        <View style={styles.itemDesc}>
          <View>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {label}
            </Text>
            <Text
              style={{
                color: theme.colors.secondary,
                fontSize: 14,
                fontWeight: '500',
              }}>
              {category}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', columnGap: 6 }}>
            <View style={styles.tag}>
              <Text style={{ fontSize: 13 }}>
                Cal: {nutrients.ENERC_KCAL.toFixed(2) + ' kcal'}
              </Text>
            </View>
            <View style={styles.tag}>
              <Text style={{ fontSize: 13 }}>
                Protein: {nutrients.PROCNT.toFixed(2) + ' g'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.addTo} activeOpacity={0.4} onPress={addFoodToDailyNutrition}>
        <Icon name="plus" size={18} color={'#fff'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 6,
    backgroundColor: theme.colors.background,
  },
  itemDesc: {
    width: '70%',
    justifyContent: 'space-between',
  },
  tag: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: theme.colors.statusBar,
  },
  addTo: {
    height: 28,
    width: 28,
    borderRadius: 20,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
});
export default FoodCard;
