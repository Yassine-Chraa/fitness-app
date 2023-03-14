import React, { useState, useEffect } from 'react';
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

const Food = ({ navigation }: any): JSX.Element => {
  const [keyword, setKeyword] = useState('');
  const [hints, setHints] = useState(Array<{ food: object }>());
  const search = () => {
    if (keyword) {
      axios
        .get(
          `https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=${keyword}`,
          {
            headers: {
              'X-RapidAPI-Key':
                '30b507191fmshf1309fbc3a2421ap1d2007jsn670e526d79e4',
              'X-RapidAPI-Host':
                'edamam-food-and-grocery-database.p.rapidapi.com',
            },
          },
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
    <Screen name="Food" allowScroll={false} action='bookmark'>
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
        <TouchableOpacity
          style={{
            ...styles.sortBtn,
            backgroundColor: theme.colors.primary,
          }}>
          <Icon name="qrcode" color={'#fff'} size={24} />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={hints}
        renderItem={({ item }) => <FoodsCard daily_nutrition_id={1} item={item.food} />}
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
