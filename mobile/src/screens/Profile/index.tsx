import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Screen from '../../components/Screen';
import UserDesc from '../../components/profile/UserDesc';
import TopButton from '../../components/profile/TopButton';
import InfoGroup from '../../components/profile/InfoGroup';
import Options from '../../components/profile/Options';
import getData from '../../Helpers/Storage/getData';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile(): JSX.Element {
  const titles = ['150', '0.0', '22.14'];
  const values = ['weight (Kg)', 'Body fat (%)', 'BMI'];
  const [currentUser, setCurrentUser] = useState(Object());
  useEffect(() => {
    getData('current_user').then(data => {
      console.log(data)
      setCurrentUser(data);
    });
  }, [AsyncStorage]);
  console.log(currentUser);
  const {name, level, workout_level, top_goal} = currentUser.user;
  return (
    <Screen name="Profile" allowScroll>
      <View style={styles.container}>
        <UserDesc userInfo={{name, workout_level, top_goal}} />
        <TopButton />
        <InfoGroup titles={titles} values={values} />
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
