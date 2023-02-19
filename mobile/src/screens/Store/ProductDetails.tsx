import {Image} from '@rneui/themed';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';

const ProductDetails = ({navigation, route}: any) => {
  const {name, type} = route.params;
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View>
          <Image
            source={{uri: 'https://placehold.jp/400x500.png'}}
            style={{
              height: 400,
            }}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode={'cover'}
          />

          <View style={styles.details}>
            <View style={styles.heading}>
              <Text style={styles.title}>{name}</Text>
              <TouchableWithoutFeedback>
                <Icon name="heart" size={20} />
              </TouchableWithoutFeedback>
            </View>
            <Text style={{fontSize: 17}}>
              4.8{' '}
              <Icon
                name="star"
                size={17}
                solid
                color={theme.colors.notification}
              />{' '}
              ({1.5}k+ review)
            </Text>
            <Text style={{marginTop: 8, marginBottom: 12, fontSize: 15}}>
              Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit
              amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem
              ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
              consectetur Lorem ipsum dolor sit amet, consectetur
            </Text>
            <View
              style={{
                ...styles.row,
                display: type == 'cloths' ? 'flex' : 'none',
              }}>
              <TouchableOpacity
                activeOpacity={0.4}
                style={{...styles.size, backgroundColor: theme.colors.text}}>
                <Text style={{color: '#fff'}}>S</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.size} activeOpacity={0.4}>
                <Text>M</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.size} activeOpacity={0.4}>
                <Text>L</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.size} activeOpacity={0.4}>
                <Text>XL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={22} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>Price</Text>
          <Text style={styles.price}>290.99DH </Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton} activeOpacity={0.4}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: '600'}}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 5,
    position: 'absolute',
    top: 8,
    left: 8,
  },
  details: {
    paddingHorizontal: 24,
    paddingTop: 36,
    marginBottom: 48,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: theme.colors.background,
    top: -32,
  },
  heading: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  size: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: theme.colors.border,
  },
  price: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    fontSize: 17,
  },
  addToCartButton: {
    backgroundColor: theme.colors.button,
    paddingHorizontal: 48,
    paddingVertical: 12,
    borderRadius: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: theme.colors.background,
  },
});
export default ProductDetails;
