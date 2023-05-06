import React, { useState } from 'react';
import { Image } from '@rneui/themed';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';

const ProgramDetails = ({ navigation, route }: any) => {
  const { program } = route.params;
  const programWorkouts: any = [
    {
      id: 1,
      name: 'Push Workout',
      exercicesNumber: 9,
      duration: 55,
      exercices: [
        {
          id: 1,
          name: 'Barbell Incline Bench Press',
          target: 'Chest',
        },
        {
          id: 2,
          name: 'Dumbbell Incline Bench Press',
          target: 'Chest',
        },
        {
          id: 3,
          name: 'Barbell Incline Bench Press',
          target: 'Chest',
        },
        {
          id: 4,
          name: 'Barbell Incline Bench Press',
          target: 'Chest',
        },
      ],
    },
    {
      id: 2,
      name: 'Pull Workout',
      exercicesNumber: 10,
      duration: 60,
      exercices: [
        {
          id: 1,
          name: 'Barbell Incline Bench Press',
          target: 'Chest',
        },
        {
          id: 2,
          name: 'Dumbbell Incline Bench Press',
          target: 'Chest',
        },
        {
          id: 3,
          name: 'Barbell Incline Bench Press',
          target: 'Chest',
        },
        {
          id: 4,
          name: 'Barbell Incline Bench Press',
          target: 'Chest',
        },
      ],
    },
    {
      id: 3,
      name: 'Legs Workout',
      exercicesNumber: 5,
      duration: 90,
      exercices: [
        {
          id: 1,
          name: 'Barbell Incline Bench Press',
          target: 'Chest',
        },
        {
          id: 2,
          name: 'Dumbbell Incline Bench Press',
          target: 'Chest',
        },
        {
          id: 3,
          name: 'Barbell Incline Bench Press',
          target: 'Chest',
        },
        {
          id: 4,
          name: 'Barbell Incline Bench Press',
          target: 'Chest',
        },
      ],
    },
  ];

  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const showExercices = (new_id: any) => {
    if (id != undefined) {
      if (id == new_id) {
        setShow(prev => !prev);
      } else {
        setShow(true);
      }
    } else {
      setShow(true)
    }
    setId(new_id);

  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Image
            style={{ width: '100%', height: 240 }}
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
            {program.isPro ? (
              <Text style={styles.tag}>Pro</Text>
            ) : (
              <Text
                style={{
                  ...styles.tag,
                  backgroundColor: '#7D8F69',
                }}>
                Free
              </Text>
            )}
            <Text style={{ fontSize: 18, color: '#fff' }}>
              {program.type} {program.days} Days
            </Text>
            <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold' }}>
              {program.name}
            </Text>
          </View>
        </View>
        <View style={styles.details}>
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.subtitle}>Program description</Text>
            <Text style={styles.desc}>
              This is a three dayn beginner, general fitness plan that can be
              performed at the gym or in home. The only pieces of equipement
              youill need is a bench and dumbbells.
            </Text>
            <Text style={styles.author}>Created by Yassine Chraa</Text>
          </View>
          {programWorkouts.map((workout: any) => {
            return (
              <View style={styles.workout} key={workout.id}>
                <TouchableOpacity
                  key={workout.id}
                  style={styles.workoutHeader}
                  onPress={() => showExercices(workout.id)}>
                  <Text style={styles.workoutTitle}>Day {workout.id}</Text>
                  <View style={styles.workoutDetails}>
                    <View style={{ justifyContent: 'center' }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: theme.colors.text,
                          marginTop: -4,
                        }}>
                        {workout.name}
                      </Text>
                      <Text>
                        {workout.exercicesNumber} exercices, {workout.duration}{' '}
                        min
                      </Text>
                    </View>
                    <View>
                      <Icon name="chevron-down" />
                    </View>
                  </View>
                </TouchableOpacity>
                <View>
                  {workout.exercices.map((exercice: any) => {
                    return (
                      <TouchableOpacity
                        key={exercice.id}
                        style={{
                          ...styles.exercice,
                          display: show && workout.id == id ? 'flex' : 'none',
                        }}
                        onPress={() =>
                          navigation.navigate('ExerciceDetails', {
                            name: exercice.name,
                            type: 'workout'
                          })
                        }>
                        <View style={{ flexDirection: 'row' }}>
                          <Image
                            style={styles.image}
                            source={{ uri: 'https://placehold.jp/60x60.png' }}
                          />
                          <View style={{ gap: 4, justifyContent: 'center' }}>
                            <Text
                              style={{
                                fontSize: 18,
                                color: theme.colors.text,
                                fontWeight: 'bold',
                              }}>
                              {exercice.name}
                            </Text>
                            <Text>{exercice.target}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </View>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          Select As Current Program
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 5,
    position: 'absolute',
    top: 8,
    left: 8,
  },
  details: {
    marginHorizontal: 16,
    marginBottom: 32,
    marginTop: 24,
  },
  heading: {
    marginTop: 8,
    marginBottom: 8,
  },
  tag: {
    color: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 3,
    backgroundColor: theme.colors.secondary,
    marginRight: 'auto',
  },
  workout: {
    marginVertical: 4,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: theme.colors.statusBar,
  },
  workoutHeader: {},
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  desc: {
    fontSize: 16,
    color: theme.colors.text,
  },
  author: {
    marginTop: 8,
    fontSize: 16,
  },
  workoutTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  exercice: {
    marginTop: 2,
    paddingVertical: 9,
    paddingHorizontal: 8,
    backgroundColor: theme.colors.statusBar,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 16,
    borderRadius: 40,
  },
  addButton: {
    zIndex: 2,
    marginLeft: 'auto',
    bottom: 10,
    right: 4,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.primary,
  },
});
export default ProgramDetails;
