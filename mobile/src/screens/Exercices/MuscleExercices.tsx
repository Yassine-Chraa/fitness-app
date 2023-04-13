import { Image } from '@rneui/themed';
import React, { useCallback, useEffect } from 'react';
import { Exercises_API_URL, Exercises_API_Token } from '@env';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { useExercise } from '../../context/providers/ExerciseContextProvider';

const MuscleExercices = ({ navigation, route }: any) => {
  const {exercises,getMuscleExercises} = useExercise();
  const { muscle } = route.params;
  const MuscleExercices = [
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
  ];

  useEffect(()=>{
    getMuscleExercises(muscle)
  },[muscle])

  const getMuscles = async () => {
    const { data } = await axios.get(
      `https://${Exercises_API_URL}/search/`,
      {
        headers: {
          'X-RapidAPI-Key':
            Exercises_API_Token,
          'X-RapidAPI-Host':
            Exercises_API_URL,
        },
        params: {name: 'Incline Hammer Curls'},
      },
    );
  }
  useFocusEffect(
    useCallback(() => {
      getMuscles();
    }, [])
  )
  return (
    <Screen name={muscle.name} action="search" backButton allowScroll>
      <TouchableOpacity style={styles.filterButton}>
        <Icon name="filter" color={'#fff'} size={16} />
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          Tous
        </Text>
      </TouchableOpacity>
      {exercises.map((exercise: any) => {
        return (
          <TouchableOpacity
            key={exercise.id}
            style={styles.exercice}
            onPress={() =>
              navigation.navigate('ExerciceDetails', { exercise })
            }>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={styles.image}
                source={{ uri: exercise.img }}
              />
              <View style={{ gap: 4, justifyContent: 'center' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: theme.colors.text,
                    fontWeight: 'bold',
                  }}>
                  {exercise.title}
                </Text>
                <Text>{exercise.category}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </Screen>
  );
};

const styles = StyleSheet.create({
  exercice: {
    flexDirection: 'row',
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.statusBar,
    borderRadius: 16,
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 16,
    borderRadius: 40,
  },
  filterButton: {
    marginRight: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.customCard,
  },
});

export default MuscleExercices;
