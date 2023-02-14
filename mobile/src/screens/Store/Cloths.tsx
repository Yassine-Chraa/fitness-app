import React from 'react';
import {StyleSheet, View, TextInput, Text, FlatList,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

//Components
import ListCategories from '../../components/Categories';
import cloths from '../../constants/cloths';
import theme from '../../constants/theme';
import {clothsCategories} from '../../constants/categories';
import StoreCard from '../../components/Cards/StoreCard';

const Cloths = ({navigation}: any): JSX.Element => {
  return (
    <View style={{paddingHorizontal: 12, flex: 1}}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={{flexDirection: 'row', marginTop: 12}}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={{flex: 1, fontSize: 18}}
                  placeholder="Search for cloths"
                />
              </View>
              <View style={styles.sortBtn}>
                <Icon name="sliders-h" color={'#fff'} size={28} />
              </View>
            </View>
            <ListCategories categories={clothsCategories} />
          </>
        )}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        data={cloths}
        renderItem={({item}) => (
          <StoreCard type="cloths" item={item} />
        )}
      />
      <TouchableOpacity style={styles.cartBtn} activeOpacity={0.4} onPress={()=>navigation.navigate('MyCart')}>
        <Icon name='shopping-cart' color='#fff' size={18} light/>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
          My Cart
        </Text>
      </TouchableOpacity>
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
  cartBtn: {
    zIndex: 2,
    marginLeft: 'auto',
    bottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.primary,
  },
});

export default Cloths;
