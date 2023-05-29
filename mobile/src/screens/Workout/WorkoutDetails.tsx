import React from 'react';
import { Image } from '@rneui/themed';
import { useState, useEffect,useCallback } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import { useWorkout } from '../../context/providers/WorkoutContextProvider';
import { useFocusEffect } from '@react-navigation/native';

const WorkoutDetails = ({ navigation, route }: any) => {
  const { workoutExercises, getWorkoutExercises } = useWorkout()
  const width = Dimensions.get('screen').width;
  const { workoutId, name } = route.params;
  const [data, setData] = useState<any>([]);

  const editWorkout = () => navigation.navigate('EditWorkout', {workoutId});

  useEffect(() => {
    getWorkoutExercises(workoutId);
  }, [workoutId])
  useFocusEffect(useCallback(() => {
    setData(workoutExercises);
  }, [workoutExercises]))
  return (
    <Screen
      name={name}
      action="edit"
      actionFunction={editWorkout}
      backButton>
      <View>
        <DraggableFlatList
          data={data}
          onDragEnd={({ data }) => setData(data)}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item, drag, isActive }: any) => {
            const txt = `${item.sets}x${item.reps} reps / rest ${item.rest}`;
            return (
              <ScaleDecorator>
                <TouchableOpacity
                  key={item.id}
                  style={styles.exercice}
                  disabled={isActive}
                  onPress={() =>
                    navigation.navigate('ExerciceDetails', {
                      exercise: item.details,
                      type: 'workout',
                    })
                  }>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TouchableWithoutFeedback onPressIn={drag}>
                      <View
                        style={{
                          width: 26,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Icon
                          name="ellipsis-v"
                          color={theme.colors.border}
                          size={18}
                        />
                        <Icon
                          name="ellipsis-v"
                          color={theme.colors.border}
                          size={18}
                        />
                      </View>
                    </TouchableWithoutFeedback>
                    <Image
                      style={styles.image}
                      source={{ uri: item?.details?.img }}
                    />
                    <View
                      style={{
                        rowGap: 8,
                        justifyContent: 'center',
                        width: width - 160,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: theme.colors.text,
                          fontWeight: 'bold',
                        }}>
                        {item.details.title}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text>{item.details.category}</Text>
                        <Text style={{ marginRight: 8 }}>{txt}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </ScaleDecorator>
            );
          }}
          ListFooterComponent={() => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('AllExercices', { workoutId })}
                style={{
                  ...styles.exercice,
                  backgroundColor: '#CFFDE1',
                  opacity: 0.6,
                }}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: 26,
                    }}></View>
                  <View
                    style={{
                      ...styles.image,
                      backgroundColor: theme.colors.button,
                      opacity: 0.4,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Icon name="plus" color={'#fff'} size={22} />
                    </View>
                  </View>
                  <View
                    style={{
                      rowGap: 8,
                      justifyContent: 'center',
                      width: width - 160,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: theme.colors.text,
                        fontWeight: 'bold',
                      }}>
                      Add Exercie
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text>Muscles</Text>
                      <Text style={{ marginRight: 8 }}>sets x reps / rest </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
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
});

export default WorkoutDetails;
