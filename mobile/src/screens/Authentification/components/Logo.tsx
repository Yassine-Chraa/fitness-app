import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Logo(): JSX.Element {
  return (
      <Image
        style={styles.image}
        source={{ uri: "../../../assets/img/logo.png" }}
      />
  )
}


const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
})
