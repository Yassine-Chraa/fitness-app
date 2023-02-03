import {Image} from '@rneui/themed';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../constants/theme';


const Card = ({food, navigation}: any) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Home', food)}>
      <View style={styles.card}>
        <View>
          <Image
            source={{uri: 'https://placehold.jp/180x260.png'}}
            style={{height: 150, width: 150}}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.mealDesc}>
          <View>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {food.name}
            </Text>
            <Text
              style={{
                color: theme.colors.secondary,
                fontSize: 14,
                marginTop: 2,
                fontWeight: '500',
              }}>
              {food.ingredients}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }}>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              ${food.price}
            </Text>
            <View style={styles.addToCartBtn}>
              <Icon name="plus" size={18} color={'#fff'} />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    marginHorizontal: 4,
    marginBottom: 20,
    borderRadius: 8,
    elevation: 6,
    gap: 20,
    backgroundColor: theme.colors.background,
  },
  addToCartBtn: {
    height: 28,
    width: 28,
    borderRadius: 20,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  mealDesc: {
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'absolute',
    top: 12,
    right: 10,
    width: '50%',
    height: '100%',
  },
});
export default Card;
