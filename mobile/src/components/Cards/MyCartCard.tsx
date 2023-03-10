import { Image } from '@rneui/themed';
import React, { useState } from 'react';
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

const MyCartCard = ({ item, amount }: any) => {
  const navigation: any = useNavigation();
  const [count, setCount] = useState(amount);
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.4}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          id: item.id,
        })
      }>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 12,
        }}>
        <Image
          source={{ uri: item.product_img || 'https://res.cloudinary.com/dtveiunmn/image/upload/v1677544795/product-placeholder_vevz7n.png' }}
          style={{ height: 75, width: 75, borderRadius: 5 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={{ height: 75, justifyContent: 'space-between' }}>
          <View>
            <Text
              style={{
                color: theme.colors.text,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {item.name}
            </Text>
            <Text>{item.sizes || item.company}</Text>
          </View>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {item.price + ' DH'}
          </Text>
        </View>
      </View>

      <View style={styles.amountController}>
        <TouchableOpacity
          style={styles.iconContainer}
          activeOpacity={0.4}
          onPress={() => setCount((prev: any) => (prev > 0 ? --prev : prev))}>
          <Icon name="minus" size={10} />
        </TouchableOpacity>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 14,
            fontWeight: 'bold',
          }}>
          {amount}
        </Text>
        <TouchableOpacity
          style={styles.iconContainer}
          activeOpacity={0.4}
          onPress={() => setCount((prev: any) => ++prev)}>
          <Icon name="plus" size={10} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
    marginBottom: 20,
    borderRadius: 5,
    elevation: 6,
    backgroundColor: theme.colors.background,
  },
  amountController: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    right: 8,
    bottom: 16,
    columnGap: 8,
  },
  iconContainer: {
    borderColor: theme.colors.border,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
  },
});
export default MyCartCard;
