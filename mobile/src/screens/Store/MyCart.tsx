import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Screen from '../../components/Screen';
import MyCartCard from '../../components/Cards/MyCartCard';
import theme from '../../constants/theme';

const MyCart = () => {
  const cartProducts = [
    {
      id: '1',
      type:'cloths',
      name: 'HIIT T-Shirt Mens',
      sizes: 'S, M, L, XL',
      price: '8.30',
      amount: 2,
    },
    {
      id: '2',
      type:'gainer',
      name: 'Hyper Mass',
      company: 'Biotech USA',
      price: '55.00',
      amount: 0
    }
  ];

  return (
    <Screen name="My Cart" backButton noAction>
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={cartProducts}
        renderItem={({item}) => <MyCartCard type={item.type} item={item} />}
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
                <Text style={styles.footerText}>500 DH</Text>
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
          marginTop: 'auto'
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
