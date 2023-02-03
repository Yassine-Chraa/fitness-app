import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Screen from '../components/Screen';
import {Image} from '@rneui/themed';
import theme from '../constants/theme';

function Home({navigation}: any): JSX.Element {
  const gymIntro = [
    {
      id: 1,
      image: require('../assets/images/items/item1.jpg'),
      title: 'Item1',
    },
    {
      id: 2,
      image: require('../assets/images/items/item2.jpg'),
      title: 'Item2',
    },
    {
      id: 3,
      image: require('../assets/images/items/item3.jpg'),
      title: 'Item3',
    },
  ];
  const products = [
    {
      id: 1,
      image: require('../assets/images/products/product1.jpg'),
      title: 'Item1',
    },
    {
      id: 2,
      image: require('../assets/images/products/product4.jpg'),
      title: 'Item2',
    },
    {
      id: 3,
      image: require('../assets/images/products/product2.jpg'),
      title: 'Item3',
    },
    {
      id: 4,
      image: require('../assets/images/products/product3.jpg'),
      title: 'Item4',
    },
    {
      id: 5,
      image: require('../assets/images/products/product5.jpg'),
      title: 'Item5',
    },
  ];

  return (
    <Screen name="Fitness App">
      <View>
        <FlatList
          data={gymIntro}
          renderItem={({item}) => {
            return (
              <View style={{elevation: 10}}>
                <Image
                  source={item.image}
                  style={{
                    height: 180,
                    width: 260,
                    marginRight: 8,
                    borderRadius: 6,
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                  resizeMode={'cover'}
                />
              </View>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: any) => item.id.toString()}
        />
      </View>

      <View style={{marginTop: 64}}>
        <View style={styles.heading}>
          <Text style={styles.title}>Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Store')}>
            <Text style={styles.textMore}>More</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={({item}) => {
            return (
              <View key={item.id}>
                <Image
                  source={{uri: 'https://placehold.jp/180x260.png'}}
                  style={{
                    height: 180,
                    width: 140,
                    marginRight: 8,
                    borderRadius: 8,
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                  resizeMode={'cover'}
                />
              </View>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: any) => item.id.toString()}
          style={{marginTop: 4}}
        />
      </View>
      <View style={{marginTop: 64}}>
        <View style={styles.heading}>
          <Text style={styles.title}>Melas</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Restaurant')}>
            <Text style={styles.textMore}>More</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={({item}) => {
            return (
              <View key={item.id}>
                <Image
                  source={{uri: 'https://placehold.jp/180x260.png'}}
                  style={{
                    height: 180,
                    width: 140,
                    marginRight: 8,
                    borderRadius: 8,
                  }}
                  PlaceholderContent={<ActivityIndicator />}
                  resizeMode={'cover'}
                />
              </View>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: any) => item.id.toString()}
          style={{marginTop: 4, marginBottom: 32}}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: '500',
  },
  textMore: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
  },
});

export default Home;
