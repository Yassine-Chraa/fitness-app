import {Avatar} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../../constants/theme';

function UserDesc(): JSX.Element {
  return (
    <View style={styles.profile}>
      <View style={styles.avatarName}>
        <Avatar
          size={70}
          rounded
          source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
          title="test"
        />
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.name}>Ben alla Ismail</Text>
          <Text style={styles.subtitle}>Beginner</Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity>
          <Icon name={'chevron-right'} size={14} solid style={styles.chevron} />
        </TouchableOpacity>
      </View>
    </View>
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
