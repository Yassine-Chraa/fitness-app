import { Image } from '@rneui/themed';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import muscles from '../../constants/muscles'
import MuscleCard from '../../components/Cards/MuscleCard';

const Exercices = ({ navigation }: any) => {
  const imageWidth = Dimensions.get('screen').width / 3 - 19;

  return (
    <Screen name="Exercices" allowScroll>
      <View>
        {muscles.map((muscle: any, index: number) => {
          return (
            <MuscleCard item={muscle} key={index}/>
          );
        })}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default Exercices;
