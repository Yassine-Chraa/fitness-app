import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import { Image } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

function UserDesc({ userInfo }: any): JSX.Element {
  const navigation: any = useNavigation();
  // onPress={() => navigation.navigate('ViewProfile',{user_id: userInfo.user_id})}

  return (
    <TouchableOpacity
      style={styles.profile}
      activeOpacity={0.4}
      onPress={() => navigation.navigate('ViewProfile',{user_id: userInfo.user_id})}>
      <View style={styles.avatarName}>
        <Image
          style={{ width: 70, height: 70, borderRadius: 35, borderWidth: 1, borderColor: "#eee" }}
          source={{ uri: userInfo.img_url ? userInfo.img_url : 'https://github.com/Yassine-Chraa/fitness-app/assets/89405673/18093430-09c2-45fa-93a0-d610ac4de056'}}
        />
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.name}>{userInfo.name}</Text>
          <Text style={styles.subtitle}>
            {userInfo.workout_level + ' / ' + userInfo.top_goal}
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity>
          <Icon name={'chevron-right'} size={16} solid style={styles.chevron} />
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
    fontSize: 22,
    color: theme.colors.text,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.primary
  },
  chevron: {
    color: theme.colors.text,
  },
});

export default UserDesc;
