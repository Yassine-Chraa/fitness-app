import React from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import { useAuth } from '../context/providers/AuthContextProvider';
import ListOfDoctors from './Profiles/ListOfDoctors';
// import UserProfile from './Profiles/UserProfile';

function Profile(): JSX.Element {
  const { logout } = useAuth();
  return (
    <Screen>
      {/* <UserProfile /> */}
      <ListOfDoctors />
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default Profile;
