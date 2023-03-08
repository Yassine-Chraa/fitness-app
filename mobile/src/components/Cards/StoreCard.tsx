import { Image } from '@rneui/themed';
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
import { useNavigation } from '@react-navigation/native';

const StoreCard = ({ item }: any) => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.4}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          id: item.id,
        })
      }>
      <View>
        <Image
          source={{ uri: item.product_img }}
          style={{ height: 150, width: 150 }}
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
            }}>
            {item.company}
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
            {item.price + ' DH'}
          </Text>
          <View style={styles.addToCartBtn}>
            <Icon name="plus" size={18} color={'#fff'} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
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
  itemDesc: {
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
export default StoreCard;
