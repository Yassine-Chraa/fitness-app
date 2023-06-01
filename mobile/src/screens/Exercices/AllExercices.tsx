import { Image } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { useExercise } from '../../context/providers/ExerciseContextProvider';
import { useWorkout } from '../../context/providers/WorkoutContextProvider';

const AllExercices = ({ route }: any) => {
  const navigation: any = useNavigation()
  const { workoutId } = route.params;
  const { exercises, getExercises } = useExercise()
  const { addExerciseToWorkout, getWorkoutExercises } = useWorkout()

  const [checked, setChecked] = useState([]);

  const confirm = async () => {
    checked.forEach(ele => {
      addExerciseToWorkout(workoutId, ele, undefined)
    });
    getWorkoutExercises(workoutId)
    navigation.goBack('WorkoutDetails')
  }

  useEffect(() => {
    getExercises();
  }, [])

  
  return (
    <Screen
      action="search"
      backButton>
      <ScrollView>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" color={'#fff'} size={16} />
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Tous
          </Text>
        </TouchableOpacity>
        {exercises.map((exercise: any) => {
          return (
            <Exercice exercise={exercise} setChecked={setChecked} />
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.confirmButton} activeOpacity={0.7} onPress={confirm}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          Confirm
        </Text>
      </TouchableOpacity>
    </Screen>
  );
};


const Exercice = ({ exercise, setChecked }: any) => {
  const navigation: any = useNavigation();

  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  return (<TouchableOpacity
  key={exercise.id}
    style={styles.exercice}
    onPress={() =>
      navigation.navigate('ExerciceDetails', { type: 'workout', exercise })
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
    <View style={{ justifyContent: 'center' }}>
      <CheckBox
        value={toggleCheckBox}
        onValueChange={(newValue) => {
          setToggleCheckBox(newValue);
          setChecked((prev: any) => [...prev, exercise.id])
        }}
      />
    </View>
  </TouchableOpacity>)
}

const styles = StyleSheet.create({
  exercice: {
    flexDirection: 'row',
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.button,
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
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.customCard,
  },
  confirmButton: {
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

export default AllExercices;
