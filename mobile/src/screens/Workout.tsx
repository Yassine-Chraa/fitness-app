import {Image} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Screen from '../components/Screen';
import theme from '../constants/theme';

const Workout = ({navigation}: any) => {
  const userWorkouts: any = [
    {
      id: 1,
      name: 'Back & Chest',
      exercicesNumber: 4,
      duration: 20,
    },
    {
      id: 2,
      name: 'Push Workout',
      exercicesNumber: 10,
      duration: 60,
    },
  ];
  return (
    <Screen name="My Workouts" action="search" addButton>
      {userWorkouts.map((workout: any) => {
        return (
          <TouchableOpacity
            key={workout.id}
            style={styles.workout}
            onPress={() =>
              navigation.navigate('WorkoutDetails', {name: workout.name})
            }>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.image}
                source={{uri: 'https://placehold.jp/60x60.png'}}
              />
              <View style={{justifyContent: 'space-between'}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: theme.colors.text,
                    fontWeight: 'bold',
                    marginTop: -4,
                  }}>
                  {workout.name}
                </Text>
                <Text>
                  {workout.exercicesNumber} exercices, {workout.duration} min
                </Text>
                <Text
                  style={{
                    backgroundColor: theme.colors.notification,
                    textAlign: 'center',
                    borderRadius: 12,
                  }}>
                  Not Started
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </Screen>
  );
};

const styles = StyleSheet.create({
  workout: {
    flexDirection: 'row',
    marginVertical: 12,
    justifyContent: 'space-between',
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 16,
    borderRadius: 8,
  },
});

export default Workout;
