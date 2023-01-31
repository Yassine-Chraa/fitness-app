import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Screen from '../components/Screen';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Home(): JSX.Element {
  const [data, setData] = useState();
  const getCurrentUser = () => {
    AsyncStorage.getItem('current_user')
      .then((res: any) => {
        setData(res);
      })
      .catch((e: any) => console.log(e));
  };

  useEffect(() => {
    getCurrentUser();
  });
  const currentUser = data != null ? JSON.parse(data) : null;
  console.log(currentUser);
  if (currentUser) {
    return (
      <Screen>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 24, fontWeight: 'bold', color: '#000'}}>
            Fitness App
          </Text>
          <Icon name="bell" size={24} solid />
        </View>
        <View style={{marginTop: 16}}>
          <Text style={styles.heading}>Coaches</Text>
        </View>
      </Screen>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    color: '#000',
  },
});

export default Home;
