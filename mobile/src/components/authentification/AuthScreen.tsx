import React from 'react';
import {StyleSheet, View, Text,Image} from 'react-native';

const AuthScreen = ({children, title}: any): JSX.Element => {
  return (
    <View style={styles.screen}>
      <Image
        style={styles.image}
        source={require('../../assets/images/logo.png')}
      />
      <Text style={styles.header}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECECEC',
  },
  image: {
    width: 150,
    height: 150,
  },
  header: {
    fontSize: 21,
    color: 'blue',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
export default AuthScreen;