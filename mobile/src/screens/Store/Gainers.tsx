import React from 'react';
import {StyleSheet, View, TextInput, ScrollView, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

//Components
import ListCategories from '../../components/Categories';
import Card from '../../components/store/Card';
import gainers from '../../constants/gainers';
import theme from '../../constants/theme';
import { gainersCategories } from '../../constants/categories';

const Gainers = ({navigation}: any): JSX.Element => {
  return (
    <View style={{paddingHorizontal: 12, flex: 1}}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={{flexDirection: 'row', marginTop: 12}}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={{flex: 1, fontSize: 18}}
                  placeholder="Search for gainers"
                />
              </View>
              <View style={styles.sortBtn}>
                <Icon name="sliders-h" color={'#fff'} size={28} />
              </View>
            </View>
            <ListCategories categories={gainersCategories}/>
          </>
        )}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={gainers}
        renderItem={({item}) => <Card type='gainer' item={item} navigation={navigation} />}
      />
    </View>
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

export default Gainers;
