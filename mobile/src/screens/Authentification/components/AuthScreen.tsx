import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import { theme } from '../../../constants/theme';

const AuthScreen = ({children, title}: any): JSX.Element => {
  return (
    <View style={styles.screen}>
      <Image
        style={styles.image}
        source={require('../../../assets/images/logo.png')}
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
    top: '-5%',
    backgroundColor: theme.colors.background,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 8,
  },
  header: {
    fontSize: 21,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
export default AuthScreen;