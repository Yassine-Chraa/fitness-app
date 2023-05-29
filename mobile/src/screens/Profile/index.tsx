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
  const { id, profile, name, workout_level, top_goal, weight, body_fat, BMI } = currentUser?.user;
  const values = ['weight (Kg)', 'Body fat (%)', 'BMI'];
  return (
    <Screen name="Profile" allowScroll>
      <View style={styles.container}>
        <UserDesc
          userInfo={{
            user_id: id,
            profile,
            name,
            workout_level,
            top_goal,
          }}
        />
        <TopButton />
        <InfoGroup titles={[weight, body_fat, BMI.toFixed(2)]} values={values} />
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
