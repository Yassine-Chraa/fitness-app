import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import {useNavigation} from '@react-navigation/native';

const GymCard = ({item}: any) => {
  const navigation: any = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.4}
      onPress={() =>
        navigation.navigate('CoachProfile', {
          name: item.name,
        })
      }>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 12,
        }}>
        <View style={styles.itemDesc}>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 14,
            }}>
            {item.address}
          </Text>
        </View>
      </View>
      {!item.current ? (
        <TouchableOpacity style={styles.addButton} activeOpacity={0.4}>
          <Text>Select</Text>
        </TouchableOpacity>
      ) : (
        <Text
          style={{
            color: theme.colors.secondary,
            fontWeight: '600',
            fontSize: 16,
          }}>
          Current
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
    elevation: 6,
    backgroundColor: theme.colors.background,
  },
  itemDesc: {
    rowGap: 4,
  },
  tag: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: theme.colors.statusBar,
  },
  addButton: {
    alignSelf: 'center',
    borderColor: theme.colors.border,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 4,
  },
});
export default GymCard;
