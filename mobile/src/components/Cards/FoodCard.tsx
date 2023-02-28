import {Image} from '@rneui/themed';
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
import {useNavigation} from '@react-navigation/native';

const FoodCard = ({type, item}: any) => {
  const navigation: any = useNavigation();
  const {label, image, nutrients, category} = item;
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
          source={{uri: image || 'https://placehold.jp/180x260.png'}}
          style={{height: 80, width: 80, borderRadius: 5}}
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
          <View style={{flexDirection: 'row', columnGap: 6}}>
            <View style={styles.tag}>
              <Text style={{fontSize: 13}}>
                Cal: {nutrients.ENERC_KCAL + ' kcal'}
              </Text>
            </View>
            <View style={styles.tag}>
              <Text style={{fontSize: 13}}>
                Protein: {nutrients.PROCNT.toFixed(2) + ' g'}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={{top: 4}} activeOpacity={0.4}>
        <Icon name="heart" size={22} />
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
});
export default FoodCard;
