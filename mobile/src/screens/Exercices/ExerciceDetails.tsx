import { Image } from '@rneui/themed';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomTextInput from '../../components/authentification/CustomTextInput';
import theme from '../../constants/theme';
import React, { useState, useEffect } from 'react';
import { useProgram } from '../../context/providers/ProgramContextProvider';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { useWorkout } from '../../context/providers/WorkoutContextProvider';


const ExerciceDetails = ({ navigation, route }: any) => {
  const { currentUser } = useAuth();
  const { currentProgram, getCurrentProgram } = useProgram()
  const { addExerciseToWorkout } = useWorkout()
  const width = Dimensions.get('screen').width - 24;
  const { type } = route.params;
  const { id, title, category, description, img, subcategory } = route.params.exercise;

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    sets: 8,
    reps: 3,
    rest: 60
  })

  const addToProgram = async (workoutID: number, workoutName: string) => {
    const { sets, reps, rest } = form;
    const msg = await addExerciseToWorkout(workoutID, id, { sets, reps, rest })
    if (msg) {
      await getCurrentProgram(currentUser!.user.id)
      setForm({
        sets: 8,
        reps: 3,
        rest: 60
      })
      setShowForm(false);
    }
  }

  useEffect(() => {
    getCurrentProgram(currentUser!.user.id)
  }, [currentUser])
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Image
          source={{ uri: img }}
          style={{
            height: 300,
            zIndex: 1,
          }}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode={'cover'}
        />


        <View style={styles.details}>
          <TouchableOpacity activeOpacity={0.5} style={styles.playButton}>
            <Icon name={true ? "play" : "pause"} size={20} color={'#fff'} />
          </TouchableOpacity>
          <View style={styles.heading}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={{ ...styles.row, marginBottom: 24 }}>
            <View style={styles.tag}>
              <Text>{category}</Text>
            </View>
          </View>


          {type !== 'workout' ? (
            <View style={{ ...styles.row, marginBottom: 24 }}>
              <View style={{ width: width / 3 - 1 }}>
                <CustomTextInput
                  value={form.sets.toString()}
                  onChangeText={(v: number) => setForm(prev => {
                    return { ...prev, sets: v }
                  })}
                  placeholder="Sets"
                  keyboardType="numeric"
                />
              </View>
              <View style={{ width: width / 3 - 10 }}>
                <CustomTextInput placeholder="Reps" keyboardType="numeric"
                  value={form.reps.toString()}
                  onChangeText={(v: number) => setForm(prev => {
                    return { ...prev, reps: v }
                  })} />
              </View>
              <View style={{ width: width / 3 - 10 }}>
                <CustomTextInput placeholder="Rest" keyboardType="numeric"
                  value={form.rest.toString()}
                  onChangeText={(v: number) => setForm(prev => {
                    return { ...prev, rest: v }
                  })} />
              </View>
              <View style={{ width: width, justifyContent: 'center' }}>
                <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(true)}>
                  <Text
                    style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                    ADD TO PROGRAM
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          <View>
            <Text style={styles.subtitle}>Execution</Text>
            <Text>
              {description}
            </Text>
          </View>
        </View>
      </View>

      <Modal animationType="slide"
        transparent={true}
        visible={showForm}
      >
        <View style={styles.modal}>
          <Text style={styles.modelTitle}>Select A workout Day</Text>
          <Pressable style={{ position: 'absolute', right: 8, top: 12 }} onPress={() => setShowForm(false)}>
            <Icon name="times" color={theme.colors.text} size={18} />
          </Pressable>
          {
            currentProgram?.details?.workouts?.map((workout: any) => {
              return (
                <TouchableOpacity key={workout.id} style={{ paddingHorizontal: 24, paddingVertical: 6, marginBottom: 4 }}
                  activeOpacity={0.6}
                  onPress={() => addToProgram(workout.id, workout.title)}>
                  <Text style={styles.workout}>{workout.title}</Text></TouchableOpacity>
              )
            })
          }
        </View>
      </Modal>

      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color={'#000'} />
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    marginHorizontal: 12,
    marginBottom: 48,
  },
  heading: {
    marginTop: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  tag: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: theme.colors.statusBar,
  },
  addButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.button,
  },
  playButton: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
    top: -30,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modal: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: 8,
    backgroundColor: theme.colors.background,
    elevation: 4,
    width: "80%",
    borderRadius: 6,
  },
  modelTitle: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 12,
    paddingLeft: 12
  },
  workout: {
    color: theme.colors.text,
    fontWeight: "500",
    fontSize: 17,
  }
});
export default ExerciceDetails;
