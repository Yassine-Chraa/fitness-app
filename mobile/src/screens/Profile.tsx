import React from 'react';
import { StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import { useAuth } from '../context/providers/AuthContextProvider';
import EditProfile from './Profiles/EditProfile';
import ListOfDC from './Profiles/ListOfDC';
// import UserProfile from './Profiles/UserProfile';

function Profile(): JSX.Element {
  const { logout } = useAuth();
  return (
    <Screen>
      {/* <UserProfile /> */}
      {/* <ListOfDC/> */}
      <EditProfile/>
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default Profile;
