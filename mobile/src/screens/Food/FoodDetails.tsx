import {useState, useEffect} from 'react';
import {Image} from '@rneui/themed';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import CustomTextInput from '../../components/authentification/CustomTextInput';

const FoodDetails = ({navigation, route}: any) => {
  const {label, image, nutrients, category} = route.params.item;
  const width = Dimensions.get('screen').width - 24;
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View>
          <Image
            source={{uri: image || 'https://placehold.jp/400x500.png'}}
            style={{
              height: 400,
            }}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode={'cover'}
          />

          <View style={styles.details}>
            <View style={styles.heading}>
              <Text style={styles.title}>{label}</Text>
              <TouchableWithoutFeedback>
                <Icon name="heart" size={20} />
              </TouchableWithoutFeedback>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 24}}>
              <View style={styles.tag}>
                <Text style={{fontSize: 13}}>{category}</Text>
              </View>
            </View>
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
                  ['Energy (cal)', nutrients.ENERC_KCAL],
                  ['Protein (g)', nutrients.PROCNT],
                  ['Fat (g)', nutrients.FAT],
                  ['Fiber, total dietary (g)', nutrients.FIBTG],
                  ['Carbohydrate (g)', nutrients.CHOCDF],
                ]}
                textStyle={styles.text}
              />
            </Table>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                columnGap: 10,
                marginBottom: 24,
              }}>
              <CustomTextInput
                placeholder="Weight (g)"
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.addButton}>
                <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                  ADD TO YOUR DAILY DIET
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color={theme.colors.text} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
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
  addButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.button,
  },
});
export default FoodDetails;
