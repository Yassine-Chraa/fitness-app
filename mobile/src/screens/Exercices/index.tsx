import {Image} from '@rneui/themed';
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

const Exercices = ({navigation}: any) => {
  const imageWidth = Dimensions.get('screen').width / 3 - 19;
  const muscles: any = [
    {
      id: 1,
      name: 'Chest',
    },
    {
      id: 2,
      name: 'Dos',
    },
    {
      id: 3,
      name: 'Legs',
    },
    {
      id: 4,
      name: 'Chest',
    },
    {
      id: 5,
      name: 'Dos',
    },
    {
      id: 6,
      name: 'Legs',
    },
    {
      id: 7,
      name: 'Chest',
    },
    {
      id: 8,
      name: 'Dos',
    },
    {
      id: 9,
      name: 'Legs',
    },
    {
      id: 10,
      name: 'Chest',
    },
    {
      id: 11,
      name: 'Dos',
    },
    {
      id: 12,
      name: 'Legs',
    },
   
  ];
  return (
    <Screen name="Exercices" allowScroll>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {muscles.map((muscle: any, index: number) => {
          return (
            <View style={{marginRight: 8, marginVertical: 8}} key={muscle.id}>
              <Image
                onPress={() => navigation.navigate('MuscleExercices',{muscle})}
                source={{uri: 'https://placehold.jp/115x115.png'}}
                style={{
                  height: imageWidth,
                  width: imageWidth,
                  borderRadius: imageWidth / 2,
                  borderWidth: 1,
                }}
                PlaceholderContent={<ActivityIndicator />}
                resizeMode={'cover'}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: theme.colors.text,
                  textAlign: 'center',
                }}>
                {muscle.name}
              </Text>
            </View>
          );
        })}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({});

export default Exercices;
