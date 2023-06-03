import { Image } from '@rneui/themed';
import React,{ useState, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions, Modal, Pressable, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import { useProgram } from '../../context/providers/ProgramContextProvider';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { Button } from '@rneui/base';
import { useWorkout } from '../../context/providers/WorkoutContextProvider';
import { useFocusEffect } from '@react-navigation/native';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const CurrentProgram = ({ navigation }: any) => {
  const { currentUser } = useAuth()
  const { getCurrentProgram, currentProgram, userPrograms } = useProgram();
  const { addWorkout, updateWorkout, deleteWorkout } = useWorkout()
  const width = Dimensions.get('screen').width - 24;
  const [form, setForm] = useState({
    title: "",
    duration: Number(),
    day: "Monday"
  })
  const [selectedId, setSelectedId] = useState(-1);
  const [showForm, setShowForm] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const submit = async () => {
    const temp = await addWorkout({ program_id: currentProgram.details.id, ...form });
    if (temp) {
      setForm({
        title: "",
        duration: Number(),
        day: "Monday"
      })
      setShowForm(false);
      await getCurrentProgram(currentUser!.user.id)
    }
  }
  const update = async () => {
    const temp = await updateWorkout(selectedId, form);
    if (temp) {
      setForm({
        title: "",
        duration: Number(),
        day: "Monday"
      })
      setEditMode(false)
      setShowForm(false);
      await getCurrentProgram(currentUser!.user.id)
    }
  }

  useFocusEffect(useCallback(() => {
    getCurrentProgram(currentUser!.user.id);
  }, [userPrograms]))
  return (
    <View style={{ paddingHorizontal: 12, flex: 1 }}>
      <ScrollView>
        <View style={{ marginBottom: 12 }}>
          <Image
            style={{ width: '100%', height: 180, borderRadius: 12 }}
            source={{uri: currentProgram?.details?.main_img || 'https://placehold.jp/600x200.png'}}
          />
          <View
            style={{
              position: 'absolute',
              left: 20,
              width: '70%',
              height: '100%',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, color: '#fff' }}>{currentProgram?.details?.category} {currentProgram.details ? currentProgram.details?.days + ' Days' : ''}</Text>
            <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold' }}>
              {currentProgram?.details?.title}
            </Text>
          </View>
        </View>
        {currentProgram?.details?.workouts?.map((workout: any,index) => {
          return (
            <TouchableOpacity
              key={workout.id}
              style={styles.workout}
              onPress={() =>
                navigation.navigate('WorkoutDetails', { workoutId: workout.id, name: workout.title, exercises: workout.exercises })
              }>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={styles.image}
                  source={{ uri: 'https://placehold.jp/80x80.png' }}
                />
                <View style={{ justifyContent: 'space-between' }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: theme.colors.text,
                      fontWeight: 'bold',
                      marginTop: -4,
                    }}>
                    {workout.title}
                  </Text>
                  <Text>
                    {workout.day}, {workout.duration} min
                  </Text>
                  <Text
                    style={{
                      backgroundColor: theme.colors.notification,
                      textAlign: 'center',
                      borderRadius: 6,
                      paddingVertical: 3,
                      paddingHorizontal: 4
                    }}>
                    {workout.state}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', columnGap: 4 }}>
                <TouchableOpacity style={{ ...styles.btn, backgroundColor: theme.colors.primary }} activeOpacity={0.4} onPress={async () => {
                  setSelectedId(workout.id)
                  setEditMode(true)
                  setShowForm(true)
                  setForm({
                    title: workout.title,
                    duration: workout.duration,
                    day: workout.day
                  })
                }}
                >
                  <Icon solid name="edit" size={15} color={'#fff'} />
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.btn, backgroundColor: theme.colors.secondary }} activeOpacity={0.4} onPress={async () => {
                  await deleteWorkout(workout.id)
                  await getCurrentProgram(currentUser!.user.id)
                }}
                >
                  <Icon name="trash" size={15} color={'#fff'} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ width, justifyContent: 'center', marginTop: 8 }}>
          <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(true)}>
            <Text
              style={{ color: theme.colors.text, fontSize: 18, fontWeight: 'bold' }}>
              ADD DAY TO PROGRAM
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal animationType="slide"
        transparent={true}
        visible={showForm}
      >
        <View style={styles.modal}>
          <Pressable style={{ position: 'absolute', right: 8, top: 8 }} onPress={() => {
            setEditMode(false)
            setShowForm(false);
            setForm({
              title: "",
              duration: Number(),
              day: "Monday"
            })
          }}><Icon name="times" color={theme.colors.text} size={18} /></Pressable>
          <Text style={{ fontSize: 20, color: theme.colors.text, fontWeight: 'bold', marginBottom: 8 }}>{editMode ? "Update" : "Create"} Workout</Text>
          <TextInput value={form.title}
            onChangeText={(v) => setForm(prev => {
              return { ...prev, title: v }
            })}
            placeholder='Name' style={styles.input} inputMode={"text"} />
          <TextInput value={form.duration.toString()}
            onChangeText={(v) => setForm((prev: any) => {
              return { ...prev, duration: v }
            })}
            placeholder='Duration' style={styles.input} inputMode={"decimal"} />
          <Picker
            selectedValue={form.day}
            onValueChange={(v: string) => setForm((prev: any) => {
              return { ...prev, day: v }
            })}
            style={{ borderWidth: 1 }}>
            {days.map((day, index) => {
              return (
                <Picker.Item key={index+day+index} label={day} value={day.toLowerCase()} />
              )
            })}
          </Picker>
          <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
            <View style={{ width: '60%', marginTop: 12 }}><Button radius={5} onPress={editMode ? update : submit}>Save</Button></View>
          </View>
        </View>
      </Modal>
    </View>
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
    width: '100%',
    paddingVertical: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: theme.colors.primary
  },
  modal: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.background,
    elevation: 4,
    width: "80%",
    borderRadius: 6,
  },
  input: {
    backgroundColor: theme.colors.statusBar,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 6,
    paddingVertical: 6,
    marginVertical: 8,
    fontSize: 15
  },
  btn: {
    height: 26,
    width: 26,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CurrentProgram;
