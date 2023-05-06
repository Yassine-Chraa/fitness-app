import React from 'react';
import { StyleSheet, View } from 'react-native';
import Option from './Option';
import theme from '../../constants/theme';
import { useAuth } from '../../context/providers/AuthContextProvider';

const Options = () => {
  const { currentUser } = useAuth()
  return (
    <View style={styles.container}>
      {currentUser?.user.role == 'coach' ? (<Option
        title="Clients"
        iconName="user-alt"
        BadgeColor={theme.colors.primary}
        link={'Coaches'}
      />) : (<Option
        title="Coaches"
        iconName="user-alt"
        BadgeColor={theme.colors.primary}
        link={'Coaches'}
      />)}
      <Option
        title="Gym Location"
        iconName="dumbbell"
        BadgeColor={theme.colors.secondary}
        link={'GymLocation'}
      />
      <Option
        title="Settings"
        iconName="wrench"
        BadgeColor={theme.colors.text}
        link={'Settings'}
      />
      <Option
        title="FeedBack"
        iconName="comment"
        link="FeedBack"
        BadgeColor={theme.colors.button}
      />
      <Option
        title="Share"
        iconName="share"
        BadgeColor={theme.colors.primary}
        share
      />
      <Option
        title="Logout"
        iconName="sign-out-alt"
        BadgeColor={theme.colors.danger}
        Logout
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    marginTop: 32,
  },
});

export default Options;
