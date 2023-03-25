import { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import theme from '../constants/theme';
import { useProduct } from '../context/providers/ProductContextProvider';

const Categories = ({ selectedCategoryIndex, setSelectedCategoryIndex,categories }: any) => {
  const { changeCategory } = useProduct();

  const change = async (id: number) => {
    setSelectedCategoryIndex(id)
    changeCategory(id)
    console.log(id)
  }
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        marginTop: 16,
        marginBottom: 32,
        alignItems: 'center',
      }}>
      {categories.map((category: any) => (
        <TouchableOpacity
          key={category.id}
          activeOpacity={0.8}
          onPress={() => change(category.id)}>
          <View
            style={{
              backgroundColor:
                selectedCategoryIndex == category.id ? theme.colors.secondary : theme.colors.primary,
              ...styles.categoryBtn,
            }}>
            <View style={styles.image}>
              <Image
                source={{ uri: 'https://placehold.jp/40x40.png' }}
                style={{ height: 40, width: 40, borderRadius: 20, resizeMode: 'cover' }}
              />
            </View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 10,
                color: Colors.white,
              }}>
              {category.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryBtn: {
    flexDirection: 'row',
    paddingVertical: 5,
    marginRight: 8,
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 12,
  },
  image: {
    backgroundColor: Colors.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Categories;
