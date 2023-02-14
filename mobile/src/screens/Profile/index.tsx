import React from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../../components/Screen';
import { useAuth } from '../../context/providers/AuthContextProvider';
import EditProfile from './EditProfile';
import ListOfDC from './ListOfDC';
import UserProfile from './UserProfile';
import ViewProfile from './ViewProfile';
// import UserProfile from './Profiles/UserProfile';

function Profile(): JSX.Element {
  return (
    <Screen name="Profile" allowScroll>
      {/* <UserProfile /> */}
      {/* <EditProfile/> */}
      <UserProfile/>
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default Profile;
