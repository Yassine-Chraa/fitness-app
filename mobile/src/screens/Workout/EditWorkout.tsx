import { Image, Input } from '@rneui/themed';
import { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import { exeriseParmType, useWorkout } from '../../context/providers/WorkoutContextProvider';

const EditInput = ({ label, value, onChangeText }: any) => {
  return (
    <View>
      <Input
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        inputMode="numeric"
        label={label}
        labelStyle={styles.label}
        containerStyle={{ height: 60 }}
      />
    </View>
  );
};
const EditWorkout = ({ navigation, route }: any) => {
  const { workoutExercises, getWorkoutExercises, updateWorkoutExercise, deleteWorkoutExercise } = useWorkout()
  const { workoutId } = route.params;
  const width = Dimensions.get('screen').width;

  const [exercises, setExercises] = useState<Array<exeriseParmType>>(workoutExercises);
  const [edited, setEdited] = useState<Array<number>>([])
  const [deleted, setDeleted] = useState<Array<number>>([])

  const save = async () => {
    edited.forEach(async (index) => {
      await updateWorkoutExercise(workoutExercises[index])
    });
    deleted.forEach(async (index) => {
      await deleteWorkoutExercise(workoutExercises[index].id);
    })
    await getWorkoutExercises(workoutId);
    navigation.goBack('WorkoutDetails')
  }
  const deleteExercise = async (exerciseID: number, index: number) => {
    setExercises((prev) => {
      const temp: any = prev.filter((exercise) => {
        return exercise.id != exerciseID;
      });
      return temp;
    })
    setDeleted(prev => [...prev, index])
    setEdited(prev => {
      const temp: any = prev.filter((item) => {
        return item != index;
      })
      return temp;
    })
  }


  return (
    <Screen
      name="Edit Workout"
      noAction
      backButton>
      <View style={{ flex: 1 }}>
        <FlatList
          data={exercises}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }: any) => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.exercice}
                onPress={() =>
                  navigation.navigate('ExerciceDetails', {
                    exercise: item.details,
                    type: 'workout',
                  })
                }>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={styles.image}
                    source={{ uri: 'https://placehold.jp/60x60.png' }}
                  />
                  <View
                    style={{
                      rowGap: 8,
                      justifyContent: 'center',
                      width: width - 108,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: theme.colors.text,
                          fontWeight: 'bold',
                        }}>
                        {item.details.title}
                      </Text>
                      <TouchableOpacity activeOpacity={0.4} onPress={() => deleteExercise(item.id, index)}>
                        <Icon
                          name="times"
                          color={theme.colors.text}
                          size={16}
                          style={{ marginTop: 6 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      <EditInput label="Sets"
                        onChangeText={(v: number) => setExercises(prev => {
                          const temp = prev.map((exercise) => {
                            if (exercise.id == item.id) {
                              exercise.sets = v;
                              if (!edited.includes(index)) {
                                setEdited((prev: Array<number>) => [...prev, index])
                              }
                            };
                            return exercise;
                          })
                          return temp;
                        })}
                        value={item.sets.toString()} />
                      <EditInput label="Reps"
                        onChangeText={(v: number) => setExercises(prev => {
                          const temp = prev.map((exercise) => {
                            if (exercise.id == item.id) {
                              exercise.reps = v;
                              if (!edited.includes(index)) {
                                setEdited((prev: Array<number>) => [...prev, index])
                              }
                            };
                            return exercise;
                          })
                          return temp;
                        })}
                        value={item.reps.toString()} />
                      <EditInput label="Rest (s)"
                        onChangeText={(v: number) => setExercises(prev => {
                          const temp = prev.map((exercise) => {
                            if (exercise.id == item.id) {
                              exercise.rest = v;
                              if (!edited.includes(index)) {
                                setEdited((prev: Array<number>) => [...prev, index])
                              }
                            };
                            return exercise;
                          })
                          return temp;
                        })}
                        value={item.rest.toString()} />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <TouchableOpacity style={styles.confirmButton} activeOpacity={0.7} onPress={save}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  exercice: {
    flexDirection: 'row',
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 8,
    borderRadius: 30,
  },
  input: {
    paddingVertical: 0,
    fontSize: 16,
    marginLeft: 'auto',
    textAlign: 'center'
  },
  label: {
    fontSize: 14,
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

export default EditWorkout;
