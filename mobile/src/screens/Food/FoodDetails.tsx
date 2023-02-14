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
import {Table, Row, Rows} from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';

const FoodDetails = ({navigation, route}: any) => {
  const {name} = route.params;
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
            <View style={{flexDirection: 'row', columnGap: 10}}>
              <View style={styles.tag}>
                <Text style={{fontSize: 13}}>Protein</Text>
              </View>
              <View style={styles.tag}>
                <Text style={{fontSize: 13}}>Vitamin C</Text>
              </View>
            </View>
            <Text style={{marginTop: 8, marginBottom: 12, fontSize: 15}}>
              Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit
              amet, consectetur Lorem ipsum dolor sit amet, consectetur Lorem
              ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
              consectetur Lorem ipsum dolor sit amet, consectetur
            </Text>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: theme.colors.statusBar,
              }}>
              <Row
                data={['Nutrients', 'PER 100 G']}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows
                data={[
                  ['Energy (cal)', '131'],
                  ['Protein (g)', '12.6'],
                  ['Fat (g)', '9.0'],
                ]}
                textStyle={styles.text}
              />
            </Table>
          </View>
        </View>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={22} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  },
  tag: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: theme.colors.statusBar,
  },
  head: {
    height: 40,
    backgroundColor: theme.colors.statusBar,
  },
  text: {
    margin: 6,
  },
});
export default FoodDetails;
