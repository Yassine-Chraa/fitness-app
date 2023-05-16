import React, { useEffect, useState } from 'react';
import { Food_API_URL, APP_ID, APP_KEY } from '@env'
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

//Components
import FoodsCard from '../../components/Cards/FoodCard';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import axios from 'axios';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { useDailyNutrition } from '../../context/providers/DailyNutritionProvider';

const Food = ({ navigation }: any): JSX.Element => {
  const { currentUser } = useAuth();
  const { dailyNutrition } = useDailyNutrition()
  const [keyword, setKeyword] = useState('');
  const [hints, setHints] = useState(Array<{ food: object }>());

  const search = () => {
    if (keyword) {
      console.log(`${Food_API_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${keyword}`)
      axios
        .get(
          `${Food_API_URL}?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${keyword}`
        )
        .then(function (response) {
          setHints(response.data.hints);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      return 'Not found';
    }
  };
  return (
    <Screen name="Food" allowScroll={false} noAction>
      <View style={{ flexDirection: 'row', marginBottom: 32 }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            inputMode='search'
            placeholder="Search for food"
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>
        <TouchableOpacity
          onPress={search}
          style={{
            ...styles.sortBtn,
            backgroundColor: theme.colors.secondary,
          }}>
          <Icon name="search" color={'#fff'} size={24} />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={hints}
        renderItem={({ item }) => <FoodsCard user_id={currentUser?.user?.id} daily_nutrition_id={dailyNutrition.id} item={item.food} />}
      />
      <TouchableOpacity style={styles.historyBtn} activeOpacity={0.4} onPress={() => navigation.navigate('DailyNutrition')}>
        <Icon name='utensils' color='#fff' size={18} />
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          Daily Nutrition
        </Text>
      </TouchableOpacity>
    </Screen>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: theme.colors.textInput,
  },
  sortBtn: {
    width: 46,
    height: 46,
    marginLeft: 4,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyBtn: {
    zIndex: 2,
    marginLeft: 'auto',
    bottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.primary,
  },
});

export default Food;
