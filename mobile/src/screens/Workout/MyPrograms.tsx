import React from 'react'
import { Image } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Modal, TouchableOpacity, ScrollView, SafeAreaView, Pressable, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { specialType, useProgram } from '../../context/providers/ProgramContextProvider';
import { Button } from '@rneui/base';


const categories = ['bulking', 'maintaining', 'cutting'];
const levels = ['beginner', 'intermediate', 'advanced'];

const MyPrograms = ({ navigation }: any) => {
  const { currentUser } = useAuth()
  const { getUserPrograms, userPrograms, createProgram, deleteProgram,useProgramAsCurrent } = useProgram();

  const [form, setForm] = useState<specialType>({
    title: "",
    category: "bulking",
    difficulty_level: "beginner"
  })
  const [showForm, setShowForm] = useState(false)

  const submit = async () => {
    await createProgram(form, currentUser?.user.id!)
    setShowForm(false)
    setForm({
      title: "",
      category: "bulking",
      difficulty_level: "beginner"
    })
    getUserPrograms(currentUser!.user!.id);
  }

  useEffect(() => {
    getUserPrograms(currentUser!.user!.id);
  }, [])
  return (
    <SafeAreaView style={{ paddingHorizontal: 12, flex: 1 }}>
      <ScrollView style={{ marginTop: 12, marginBottom: 4 }} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" color={'#fff'} size={15} />
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>
            Tous
          </Text>
        </TouchableOpacity>
        {userPrograms?.map((program: any, index: number) => {
          const { id, category, days, title } = program.details;
          return (
            <TouchableHighlight
              key={id+11*index}
              style={styles.program}
              onPress={() =>
                navigation.navigate('MyProgramsDetails', { programId: program.id, program: program.details })
              }>
              <View>
                <Image
                  style={{ width: '100%', height: 160, borderRadius: 12 }}
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
                  <View style={{ position: 'absolute', top: 12, left: -20 }}>
                    {program.isUsed ? (
                      <Text style={styles.tag}>Current</Text>
                    ) : null}
                  </View>
                  <Text style={{ fontSize: 18, color: '#fff', marginTop: 16 }}>
                    {category} {days} Days
                  </Text>
                  <Text
                    style={{ fontSize: 28, color: '#fff', fontWeight: 'bold' }}>
                    {title}
                  </Text>
                </View>
                <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.4} onPress={() => {
                  deleteProgram(program.id);
                  getUserPrograms(currentUser?.user?.id!)
                }}
                >
                  <Icon name="trash" size={16} color={'#fff'} />
                </TouchableOpacity>
                {!program.isUsed ? (
                  <TouchableOpacity style={styles.switchBtn} activeOpacity={0.4} onPress={() => {
                    useProgramAsCurrent(program.id);
                    getUserPrograms(currentUser?.user?.id!)
                  }}
                  >
                    <Text style={{ color: '#fff' }}>Switch</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(true)}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          Create Program
        </Text>
      </TouchableOpacity>
      <Modal animationType="slide"
        transparent={true}
        visible={showForm}
      >
        <View style={styles.modal}>
          <Pressable style={{ position: 'absolute', right: 8, top: 8 }} onPress={() => setShowForm(false)}><Icon name="times" color={theme.colors.text} size={18} /></Pressable>
          <Text style={{ fontSize: 20, color: theme.colors.text, fontWeight: 'bold', marginBottom: 8 }}>Create Program</Text>
          <TextInput value={form.title} onChangeText={(v: string) => setForm(prev => {
            return { ...prev, title: v }
          })} placeholder='Name' style={styles.input} inputMode={"text"} />
          <Picker
            selectedValue={form.category}
            onValueChange={(v: string) => setForm((prev: any) => {
              return { ...prev, category: v }
            })}
            style={{ borderWidth: 1 }}>
            {categories.map((category, index) => {
              return (
                <Picker.Item key={index+category+index} label={category.toUpperCase()} value={category} />
              )
            })}
          </Picker>
          <Picker
            selectedValue={form.difficulty_level}
            onValueChange={(v: string) => setForm((prev: any) => {
              return { ...prev, difficulty_level: v }
            })}

            style={{ borderWidth: 1 }}>
            {levels.map((category,index) => {
              return (
                <Picker.Item key={index+category+index} label={category.toUpperCase()} value={category} />
              )
            })}
          </Picker>
          <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
            <View style={{ width: '60%', marginTop: 12 }}><Button radius={5} onPress={submit}>Save</Button></View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  program: {
    marginBottom: 16,
  },
  tag: {
    fontSize: 14,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 1,
    backgroundColor: theme.colors.secondary,
    marginRight: 'auto',
  },
  filterButton: {
    marginRight: 'auto',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.secondary,
  },
  addButton: {
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
  deleteBtn: {
    backgroundColor: theme.colors.primary,
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 4,
    right: 4
  },
  switchBtn: {
    backgroundColor: theme.colors.danger,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 4,
    position: 'absolute',
    bottom: 8,
    right: 8,
  }
});

export default MyPrograms;
