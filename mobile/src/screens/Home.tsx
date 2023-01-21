import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import { useProduct } from '../Context/ProductContext';

function Home(): JSX.Element {
  const {getProducts} = useProduct();
  const data = getProducts();
  console.log(data);
  return <Text>Home</Text>;
}

const styles = StyleSheet.create({});

export default Home;
