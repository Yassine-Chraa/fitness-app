import React from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import { useAuth } from '../context/providers/AuthContextProvider';
import EditProfile from './Profiles/EditProfile';
import ListOfDC from './Profiles/ListOfDC';
import UserProfile from './Profiles/UserProfile';
import ViewProfile from './Profiles/ViewProfile';
// import UserProfile from './Profiles/UserProfile';

function Profile(): JSX.Element {
  return (
    <Screen name="Profile" action="none">
      {/* <UserProfile /> */}
      {/* <ListOfDC/> */}
      {/* <EditProfile/> */}
      <UserProfile/>
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default Profile;
