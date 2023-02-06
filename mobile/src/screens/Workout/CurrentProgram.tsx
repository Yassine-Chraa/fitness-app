import {Image} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../../constants/theme';

const CurrentProgram = ({navigation}: any) => {
  const userProgram: any = {
    name: 'Test Plan',
    workouts: [
      {
        id: 1,
        name: 'Push Workout',
        exercicesNumber: 9,
        duration: 55,
      },
      {
        id: 2,
        name: 'Pull Workout',
        exercicesNumber: 10,
        duration: 60,
      },
      {
        id: 3,
        name: 'Legs Workout',
        exercicesNumber: 5,
        duration: 90,
      },
    ],
  };
  return (
    <SafeAreaView style={{paddingHorizontal: 12, flex: 1}}>
      <ScrollView>
        <View style={{marginBottom: 12}}>
          <Image
            style={{width: '100%', height: 180, borderRadius: 12}}
            source={require('../../assets/images/program1.jpg')}
          />
          <View
            style={{
              position: 'absolute',
              left: 20,
              width: '70%',
              height: '100%',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 18, color: '#fff'}}>Bulking 3 Days</Text>
            <Text style={{fontSize: 28, color: '#fff', fontWeight: 'bold'}}>
              Push/Pull/Legs Program
            </Text>
          </View>
        </View>
        {userProgram.workouts.map((workout: any) => {
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
                  source={{uri: 'https://placehold.jp/80x80.png'}}
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
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
          Add Day to Program
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  addButton: {
    zIndex: 2,
    marginLeft: 'auto',
    bottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.primary,
  },
});

export default CurrentProgram;
