import { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Screen from '../../components/Screen';
import MyCartCard from '../../components/Cards/MyCartCard';
import theme from '../../constants/theme';
import { useCart } from '../../context/providers/CartContextProvider';
import getData from '../../Helpers/Storage/getData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/providers/AuthContextProvider';


const MyCart = () => {
  const { currentUser } = useAuth();
  const { getCart } = useCart();

  const [cartProducts, setCartProducts] = useState(Array<object>);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    const data = await getCart(currentUser?.user.id);
    setCartProducts(data)
    setTotal(() => {
      let _total = 0;
      data?.forEach((item: any) => {
        _total += item.amount * item.product.price
      });
      return _total;
    })

  };
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <Screen name="My Cart" backButton noAction>
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={cartProducts}
        renderItem={({ item }: any) => <MyCartCard type={item.product.category} item={item.product} amount={item.amount} />}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                backgroundColor: theme.colors.background,
                paddingVertical: 12,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.footerText}>Total Price</Text>
                <Text style={styles.footerText}>{total + ' DH'}</Text>
              </View>
              <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.4}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: '600',
                    textAlign: 'center',
                  }}>
                  Proceed to Checkout
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponentStyle={{
          marginTop: 'auto',
        }}
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  checkoutBtn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 48,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
  },
});
export default MyCart;
