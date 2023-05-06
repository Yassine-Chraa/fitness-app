import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import theme from '../../constants/theme';

export const Component1 = ({title, value}: any) => (
  <TouchableOpacity
    activeOpacity={0.6}
    style={{...styles.card, borderBottomLeftRadius: 8, borderTopLeftRadius: 8}}>
    <Text style={styles.data}>{title}</Text>
    <Text style={styles.title}>{value}</Text>
  </TouchableOpacity>
);
export const Component2 = ({title, value}: any) => (
  <TouchableOpacity
    activeOpacity={0.6}
    style={{...styles.card, marginHorizontal: 4}}>
    <Text style={styles.data}>{title}</Text>
    <Text style={styles.title}>{value}</Text>
  </TouchableOpacity>
);
export const Component3 = ({title, value}: any) => (
  <TouchableOpacity
    activeOpacity={0.6}
    style={{
      ...styles.card,
      borderBottomRightRadius: 8,
      borderTopRightRadius: 8,
    }}>
    <Text style={styles.data}>{title}</Text>
    <Text style={styles.title}>{value}</Text>
  </TouchableOpacity>
);

const InfoGroup = ({titles, values}: any): JSX.Element => {
  return (
    <View style={styles.container}>
      <Component1 title={titles[0]} value={values[0]} />
      <Component2 title={titles[1]} value={values[1]} />
      <Component3 title={titles[2]} value={values[2]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.colors.customCard,
    flex: 1,
  },
  data: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  title: {
    color: '#ddd',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default InfoGroup;
