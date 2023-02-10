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

const FoodCard = ({type, item, navigation}: any) => {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.4}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          name: item.name,
          type: type,
        })
      }>
      <View style={{flexDirection: 'row', gap: 20, width: '90%',alignItems: 'center'}}>
        <View>
          <Image
            source={{uri: 'https://placehold.jp/180x260.png'}}
            style={{height: 60, width: 60, borderRadius: 30}}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.itemDesc}>
          <View>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: theme.colors.secondary,
                fontSize: 14,
                marginTop: 2,
                fontWeight: '500',
                marginBottom: 4
              }}>
              {item.cat}
            </Text>
            <View style={{flexDirection: 'row',columnGap: 10}}>
              <View style={styles.tag}>
                <Text style={{fontSize: 13}}>Protein</Text>
              </View>
              <View style={styles.tag}>
                <Text style={{fontSize: 13}}>Vitamin C</Text>
              </View>
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
    width: '50%',
    height: '100%',
  },
  tag: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: theme.colors.statusBar,
  },
});
export default FoodCard;
