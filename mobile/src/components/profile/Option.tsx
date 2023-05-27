import React, { useState } from 'react'
import { TouchableOpacity, Text, StyleSheet, View, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import appInfo from '../../../app.json';
import { useAuth } from '../../context/providers/AuthContextProvider';
import LogOutMOdal from '../tinyCompo/LogOutModal';
const Option = ({
  title,
  iconName,
  BadgeColor,
  link,
  share,
  Logout,
}: any): JSX.Element => {
  const navigation: any = useNavigation();
  const { logout }: any = useAuth();
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      {/* ------------------( logOut modal)-------------------- */}
      <LogOutMOdal isVisible={isVisible} setIsVisible={setIsVisible} logOut={logout} />


      <TouchableOpacity
        activeOpacity={0.4}
        style={{ ...styles.row, ...styles.container }}
        onPress={() => {
          if (!share && !Logout) navigation.navigate(link);
          if (share)
            Share.share({
              message: `Check out \"${appInfo.displayName}\"\n\n${appInfo.appLink}`,
            });
          if (Logout) {
            setIsVisible(() => true)
          }
        }}>
        <View style={{ ...styles.row, gap: 12 }}>
          <View style={{ ...styles.iconContainer, backgroundColor: BadgeColor }}>
            <Icon name={iconName} size={18} color={'#fff'} solid />
          </View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <Icon name={'chevron-right'} size={20} color={theme.colors.text} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  text: {
    color: theme.colors.text,
    fontSize: 18,
  },
  iconContainer: {
    height: 32,
    width: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
});

export default Option;
