import { Image } from '@rneui/themed';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomTextInput from '../../components/authentification/CustomTextInput';
import theme from '../../constants/theme';
import { useState, useEffect } from 'react';
import { useProgram } from '../../context/providers/ProgramContextProvider';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { useWorkout } from '../../context/providers/WorkoutContextProvider';
import AnimatedLottieView from 'lottie-react-native';
import Screen from '../../components/Screen';
import animations from '../../constants/animations';


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

  const addToProgram = async (workoutID: number) => {
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
      Alert.alert(msg);
    }
  }

  useEffect(() => {
    getCurrentProgram(currentUser!.user.id)
  }, [currentUser])
  return (
    <Screen name={category} noAction backButton allowScroll>
      <View style={{ flex: 1 }}>

        <View style={styles.animationContainer}>
          <View style={styles.animation}>
            <AnimatedLottieView
              source={animations[subcategory]}
              autoPlay
              loop
              speed={1}
              resizeMode="cover"
              style={{
                width: 240,
                height: 240,
                backgroundColor: 'transparent',
              }}
            />
          </View>
        </View>


        <View style={styles.details}>
          <TouchableOpacity activeOpacity={0.5} style={styles.playButton}>
            <Icon name={true ? "play" : "pause"} size={20} color={'#f00e'} />
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
            <View style={styles.inputAddContainer}>

              <View style={styles.inputItemContainer}>
                <View style={styles.inputItem}>
                  <CustomTextInput
                    value={form.sets.toString()}
                    onChangeText={(v: number) => setForm(prev => {
                      return { ...prev, sets: v }
                    })}
                    placeholder="Sets"
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.inputItem}>
                  <CustomTextInput placeholder="Reps" keyboardType="numeric"
                    value={form.reps.toString()}
                    onChangeText={(v: number) => setForm(prev => {
                      return { ...prev, reps: v }
                    })} />
                </View>
                <View style={styles.inputItem}>
                  <CustomTextInput placeholder="Rest" keyboardType="numeric"
                    value={form.rest.toString()}
                    onChangeText={(v: number) => setForm(prev => {
                      return { ...prev, rest: v }
                    })} />
                </View>
              </View>

              <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(true)}>
                <Text
                  style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                  ADD TO PROGRAM
                </Text>
              </TouchableOpacity>

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


      {/* ==================(modal)=================== */}
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
                  onPress={() => addToProgram(workout.id)}>
                  <Text style={styles.workout}>{workout.title}</Text></TouchableOpacity>
              )
            })
          }
        </View>
      </Modal>
      {/* ============================================= */}
    </Screen>
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
    marginBottom: 20,
  },
  playButton: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
    top: -27,
    borderRadius: 10,
    backgroundColor: '#ddd',
    borderColor: '#f00',
    borderWidth: 1,
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
    zIndex: 3,
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
  },
  animationContainer: {
    flex: 1,
    width: '100%',
    display: 'flex',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',

  },
  animation: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0003',
    borderRadius: 4,
    margin: 2,
  },
  inputItem: {
    flex: 1,
  },
  inputItemContainer: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  inputAddContainer: {
    flex: 1,
    width: '100%',
    display: 'flex',
  }
});
export default ExerciceDetails;
