import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

//Components
import FoodsCard from '../../components/Cards/FoodCard';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import Categories from '../../components/Categories';
import { foodCategories } from '../../constants/categories';

const Food = ({navigation}: any): JSX.Element => {
  const foods = [
    {
      id: 1,
      name: 'Chicken breast',
      cat: 'Protein Foods',
    },
    {
      id: 2,
      name: 'Eggs',
      cat: 'Protein Foods',
    }
  ]
  return (
    <Screen name="Food" allowScroll={false}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={{flex: 1, fontSize: 18}}
                  placeholder="Search for food"
                />
              </View>
              <View style={styles.sortBtn}>
                <Icon name="sliders-h" color={'#fff'} size={28} />
              </View>
            </View>
            <Categories categories={foodCategories}/>
          </>
        )}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={foods}
        renderItem={({item}) => <FoodsCard item={item} />}
      />
      
    </Screen>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.textInput,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Food;
