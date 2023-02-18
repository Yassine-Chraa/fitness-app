import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import {Image} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

function UserDesc(): JSX.Element {
  const navigation: any = useNavigation();
  const userInfo = {
    fullName: 'Ben alla Ismail',
    level: 'Beginner',
  };
  return (
    <TouchableOpacity
      style={styles.profile}
      activeOpacity={0.4}
      onPress={() =>
        navigation.navigate('EditProfile')
      }>
      <View style={styles.avatarName}>
        <Image
          style={{width: 70, height: 70, borderRadius: 35}}
          source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
        />
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.name}>{userInfo.fullName}</Text>
          <Text style={styles.subtitle}>{userInfo.level}</Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity>
          <Icon name={'chevron-right'} size={14} solid style={styles.chevron} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarName: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 14,
  },
  name: {
    fontSize: 20,
    color: theme.colors.text,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 14,
  },
  chevron: {
    color: theme.colors.text,
    paddingHorizontal: 3,
  },
});

export default UserDesc;
