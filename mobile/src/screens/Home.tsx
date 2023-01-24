import React, { useEffect, useState } from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useProduct} from '../Context/ProductContext';
import Product from '../types/Product';

function Home(): JSX.Element {
  const {getProducts} = useProduct();
  const [data, setData] = useState(Array<Product>);
  const fetchData = async () => {
    const res = await getProducts();
    setData(res);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <FlatList data={data} renderItem={({item,index})=>{
        return(
          <View key={index}>
            <Text>Name: {item.name}</Text>
            <Text>Prix: {item.prix} DH</Text>
            <Text>Stock: {item.stock}</Text>
          </View>
        )
      }}/>
    </View>
  )
}

const styles = StyleSheet.create({});

export default Home;
