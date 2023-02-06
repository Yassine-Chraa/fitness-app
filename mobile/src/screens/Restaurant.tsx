import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

//Components
import ListCategories from '../components/Categories';
import Card from '../components/Card';
import Screen from '../components/Screen';
import foods from '../constants/foods';
import theme from '../constants/theme';

const Restaurant = ({navigation}: any): JSX.Element => {
  return (
    <Screen name="Restaurant" allowScroll={false}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={{flex: 1, fontSize: 18}}
                  placeholder="Search for food"
                />
              </View>
              <View style={styles.sortBtn}>
                <Icon name="sliders-h" color={'#fff'} size={28} />
              </View>
            </View>
            <View>
              <ListCategories />
            </View>
          </>
        )}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={foods}
        renderItem={({item}) => <Card food={item} navigation={navigation} />}
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.textInput,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Restaurant;
