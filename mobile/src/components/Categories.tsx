import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
  Pressable
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import theme from '../constants/theme';
import { useProduct } from '../context/providers/ProductContextProvider';

const Categories = ({ categories }: any) => {
  const { setCategoryId, categoryId } = useProduct();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        marginTop: 16,
        marginBottom: 32,
        alignItems: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setCategoryId(0)}>
        <View
          style={{
            backgroundColor:
              categoryId == 0 ? theme.colors.secondary : theme.colors.primary,
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
            All Products
          </Text>
        </View>
      </TouchableOpacity>
      {categories.map((category: any) => (
        <Pressable
          key={category.id}
          onPress={() => setCategoryId(category.id)}>
          <View
            style={{
              backgroundColor:
                categoryId == category.id ? theme.colors.secondary : theme.colors.primary,
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
        </Pressable>
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
    borderRadius: 20,
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
