import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

//Components
import ListCategories from '../../components/Categories';
import theme from '../../constants/theme';
import StoreCard from '../../components/Cards/StoreCard';
import { useProduct } from '../../context/providers/ProductContextProvider';
import { useFocusEffect } from '@react-navigation/native';
import { useCategory } from '../../context/providers/CategoryConextProvider';

const Gainers = ({ navigation }: any): JSX.Element => {
  const { products, getProducts, searchProduct } = useProduct();
  const { getCategories, categories } = useCategory();

  const [keyword, setKeyword] = useState('');

  useFocusEffect(
    useCallback(() => {
      getProducts();
      getCategories();
    }, [])
  )
  return (
    <View style={{ paddingHorizontal: 12, flex: 1 }}>
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, fontSize: 18 }}
            placeholder="Search for nutritions"
            value={keyword}
            onChangeText={setKeyword}
          />
        </View>
        <TouchableOpacity style={styles.sortBtn} activeOpacity={0.4} onPress={() => searchProduct(keyword)}>
          <Icon name="search" color={'#fff'} size={28} />
        </TouchableOpacity>
      </View>
      <FlatList
        ListHeaderComponent={() => (
          <ListCategories categories={categories.filter((category: any) => {
            return category.parent === 'gym_nutrition'
          })} />
        )}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={products}
        renderItem={({ item }: any) => {
          if (item.category.parent === 'gym_nutrition') {
            return <StoreCard item={item} />
          } else {
            return null;
          }
        }}
      />
      <TouchableOpacity style={styles.cartBtn} activeOpacity={0.4} onPress={() => navigation.navigate('MyCart')}>
        <Icon name='shopping-cart' color='#fff' size={18} light />
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          My Cart
        </Text>
      </TouchableOpacity>
    </View>
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
  cartBtn: {
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

export default Gainers;
