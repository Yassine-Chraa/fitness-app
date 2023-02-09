import React from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import categories from '../../constants/categories';
import theme from '../../constants/theme';

const Categories = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        marginTop: 16,
        alignItems: 'center',
      }}>
      {categories.map((category: any, ind: any) => (
        <TouchableOpacity
          key={ind}
          activeOpacity={0.8}
          onPress={() => setSelectedCategoryIndex(ind)}>
          <View
            style={{
              backgroundColor:
                selectedCategoryIndex == ind ? theme.colors.secondary : theme.colors.primary,
              ...styles.categoryBtn,
            }}>
            <View style={styles.image}>
              <Image
                source={{uri: 'https://placehold.jp/40x40.png'}}
                style={{height: 40, width: 40,borderRadius: 20, resizeMode: 'cover'}}
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
    marginRight: 7,
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 8,
  },
  image: {
    backgroundColor: Colors.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Categories;
