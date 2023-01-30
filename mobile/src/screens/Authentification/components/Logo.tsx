import React from 'react';
import {StyleSheet,Image} from 'react-native';

export default function Logo(): JSX.Element {
  return (
    <Image
      style={styles.image}
      source={require('../../../assets/images/logo.png')}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
});
