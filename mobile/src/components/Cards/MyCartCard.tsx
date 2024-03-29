import { Image } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
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
import { useCart } from '../../context/providers/CartContextProvider';
import { useAuth } from '../../context/providers/AuthContextProvider';

const MyCartCard = ({ item, setTotal }: any) => {
  const { currentUser } = useAuth();
  const { deleteProduct } = useCart();
  const navigation: any = useNavigation();
  const [count, setCount] = useState(0);
  const prevCountRef:any = useRef();

  useEffect(() => {
    console.log(prevCountRef.current)
    setTotal((prev: number) => prev + (count - (prevCountRef.current | 0)) * item.price)
    prevCountRef.current = count;
  }, [count])
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
        }}>
        <Image
          source={{ uri: item.product_img || 'https://res.cloudinary.com/dtveiunmn/image/upload/v1677544795/product-placeholder_vevz7n.png' }}
          style={{ height: 75, width: 75, borderRadius: 5,marginRight: 12 }}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={{ height: 75,width:'65%', justifyContent: 'space-between' }}>
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
      <TouchableOpacity
        style={{ backgroundColor: theme.colors.button, height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}
        activeOpacity={0.4}
        onPress={() => deleteProduct(currentUser.user.id, item.id)}>
        <Icon name="trash" size={16} color={'#fff'} />
      </TouchableOpacity>
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
          {count}
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
