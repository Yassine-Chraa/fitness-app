import {Image} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import Screen from '../components/Screen';
import theme from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Workout = ({navigation}:any) => {
  const userWorkouts: any = [
    {
      id: 1,
      name: 'Back & Chest',
      exercicesNumber: 4,
      duration: 20,
    },
  ];
  return (
    <Screen name="My Workouts" action="search">
      <ScrollView>
        {userWorkouts.map((workout: any) => {
          return (
            <TouchableOpacity key={workout.id} style={styles.workout} onPress={()=>navigation.navigate('WorkoutDetails')}>
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
                      {workout.exercicesNumber} exercices, {workout.duration}{' '}
                      min
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
                <TouchableNativeFeedback>
                  <Icon name="ellipsis-h" />
                </TouchableNativeFeedback>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  workout: {
    flexDirection: 'row',
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 16,
  },
});

export default Workout;
