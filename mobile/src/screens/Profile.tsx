import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Screen from '../components/Screen';
import {useAuth} from '../context/providers/AuthContextProvider';

function Profile(): JSX.Element {
  const {logout} = useAuth();
  return (
    <Screen>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default Profile;
