import {Image} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Screen from '../components/Screen';
import theme from '../constants/theme';

const MuscleExercices = ({navigation, route}: any) => {
  const {muscle} = route.params;
  return (
    <Screen name={muscle.name} action="search" backButton>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default MuscleExercices;
