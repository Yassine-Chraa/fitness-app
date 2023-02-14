import {Image} from '@rneui/themed';
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../../constants/theme';

function TopButtons(): JSX.Element {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.CustomBtnContainer}>
      <Icon name={'gem'} color={'white'} size={18} solid />
      <Text style={{color: 'white', marginLeft: 16, fontSize: 18,letterSpacing: 2}}>
        Upgrade
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  CustomBtnContainer: {
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: theme.colors.button,
    paddingVertical: 10,
    borderRadius: 6,
    flex: 1,
  },
});

export default TopButtons;
