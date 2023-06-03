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
import { useAuth } from '../../context/providers/AuthContextProvider';
import { useProgram } from '../../context/providers/ProgramContextProvider';
import Toast from 'react-native-toast-message';


const allowedUsers = ['client', 'vip', 'admin'];
const ProgramDetails = ({ navigation, route }: any) => {
  const { currentUser } = useAuth();
  const { enrollProgram,getUserPrograms } = useProgram();
  const { program } = route.params;
  const width = Dimensions.get('screen').width;

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
  const enroll = async () => {
    if (program.isFree == 1) {
      await enrollProgram(currentUser!.user.id, program.id);
      await getUserPrograms(currentUser!.user.id)
      Toast.show({
        type: 'success',
        text1: 'Premium Program Enrolled !',
      });
      navigation.navigate('Current')
    } else {
      if (allowedUsers.includes(currentUser!.user.role)) {
        await enrollProgram(currentUser!.user.id, program.id);
        await getUserPrograms(currentUser!.user.id)
        Toast.show({
          type: 'success',
          text1: 'Premium Program Enrolled !',
        });
        navigation.navigate('Current')
      } else {
        Toast.show({
          type: 'error',
          text1: 'Became Client To Enroll This Program ! !',
        });
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Image
            style={{ width: '100%', height: 240 }}
            source={{ uri: program.main_img }}
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
            <Text style={styles.subtitle}>Program Description</Text>
            <Text style={styles.desc}>
              {program.description}
            </Text>
            <Text style={styles.author}>Created by Yassine Chraa</Text>
          </View>
          {program?.workouts?.map((workout: any) => {
            return (
              <View style={styles.workout} key={workout.id}>
                <TouchableOpacity
                  key={workout.id}
                  style={styles.workoutHeader}
                  onPress={() => showExercices(workout.id)}>
                  <Text style={styles.workoutTitle}>{workout.day}</Text>
                  <View style={styles.workoutDetails}>
                    <View style={{ justifyContent: 'center' }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: theme.colors.text,
                          marginTop: -4,
                        }}>
                        {workout.title}
                      </Text>
                      <Text>
                        {workout.duration}{' '}
                        min
                      </Text>
                    </View>
                    <View>
                      <Icon name="chevron-down" />
                    </View>
                  </View>
                </TouchableOpacity>
                <View>
                  {workout.exercises.map((exercise: any) => {
                    const { title, img, category } = exercise.details;
                    const { sets, reps, rest } = exercise;
                    const txt = `${sets}x${reps} reps / rest ${rest}`;
                    return (
                      <TouchableOpacity
                        key={exercise.id}
                        style={{
                          ...styles.exercise,
                          display: show && workout.id == id ? 'flex' : 'none',
                        }}
                        onPress={() =>
                          navigation.navigate('ExerciceDetails', {
                            exercise: exercise.details,
                            type: 'workout'
                          })
                        }>
                        <View style={{ flexDirection: 'row' }}>
                          <Image
                            style={styles.image}
                            source={{ uri: img }}
                          />
                          <View style={{ gap: 4, justifyContent: 'center', width: width - 160, }}>
                            <Text
                              style={{
                                fontSize: 18,
                                color: theme.colors.text,
                                fontWeight: 'bold',
                              }}>
                              {title}
                            </Text>
                            <View style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                              <Text>{category}</Text>
                              <Text>{txt}</Text>
                            </View>

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
      <TouchableOpacity style={styles.addButton} activeOpacity={0.4} onPress={enroll}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          Enroll Program
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
    textTransform: 'capitalize'
  },
  exercise: {
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
