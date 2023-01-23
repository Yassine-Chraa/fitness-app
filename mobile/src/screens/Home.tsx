import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {useProduct} from '../Context/ProductContext';

function Home(): JSX.Element {
  const {getProducts} = useProduct();
  getProducts().then(res => {
    console.log(res);
  });
  return <Text>Home</Text>;
}

const styles = StyleSheet.create({});

export default Home;
