import { Image } from '@rneui/themed';
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Screen from '../../components/Screen';
import muscles from '../../constants/muscles'
import MuscleCard from '../../components/Cards/MuscleCard';
import Devider from '../../components/tinyCompo/Divider';

const Exercices = () => {
  return (
    <Screen name="Exercices" noAction allowScroll>
      <View>
        {muscles.map((muscle: any, index: number) => {
          return (
            <View style={{ flex: 1 }} key={index + Math.random()}>
              <MuscleCard item={muscle} />
              <Devider />
            </View>
          );
        })}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default Exercices;
