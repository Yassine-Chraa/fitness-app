import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Screen from '../../components/Screen';
import UserDesc from '../../components/profile/UserDesc';
import TopButton from '../../components/profile/TopButton';
import InfoGroup from '../../components/profile/InfoGroup';
import Options from '../../components/profile/Options';
import { useAuth } from '../../context/providers/AuthContextProvider';

function Profile(): JSX.Element {
  const { currentUser } = useAuth();
  const values = ['weight (Kg)', 'Body fat (%)', 'BMI'];
  const user = currentUser?.user;
  return (
    <Screen name="Profile" allowScroll>
      <View style={styles.container}>
        <UserDesc
          userInfo={{
            user_id: user?.id,
            profile: user?.profile,
            name: user?.name,
            workout_level: user?.workout_level,
            top_goal: user?.top_goal,
            img_url:user?.img_url,
          }}
        />
        <TopButton />
        <InfoGroup titles={[user?.weight, user?.body_fat, user?.BMI.toFixed(2)]} values={values} />
        <Options />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
});

export default Profile;
