import React from 'react';
import { Image } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, TextInput, ScrollView } from 'react-native';
import { Button } from '@rneui/base';
import theme from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import { specialType, useProgram } from '../../context/providers/ProgramContextProvider';
import { useAuth } from '../../context/providers/AuthContextProvider';

const categories = ['bulking', 'maintaining', 'cutting'];
const levels = ['beginner', 'intermediate', 'advanced'];
const MyProgramsDetails = ({ navigation, route }: any) => {
    const { program, programId,isPublic } = route.params
    const { title, main_img, category, difficulty_level, days } = program
    const { currentUser } = useAuth()
    const { getUserPrograms, updateProgram } = useProgram();
    const [local, setLocal] = useState({
        title,
        category
    })
    const [form, setForm] = useState<specialType>({
        title,
        category,
        difficulty_level
    })
    const [showForm, setShowForm] = useState(false)

    const submit = async () => {
        await updateProgram(programId, form)
        setLocal({
            title: form.title,
            category: form.category
        })
        setShowForm(false)
        getUserPrograms(currentUser!.user!.id);
    }

    return (
        <View style={{ paddingHorizontal: 12, flex: 1 }}>
            <ScrollView>
                <View style={{ marginBottom: 12, marginTop: 12 }}>
                    <Image
                        style={{ width: '100%', height: 180, borderRadius: 12 }}
                        source={{ uri: main_img }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            left: 20,
                            width: '70%',
                            height: '100%',
                            justifyContent: 'center',
                        }}>
                        <Text style={{ fontSize: 18, color: '#fff' }}>{local.category} {days} Days</Text>
                        <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold' }}>
                            {local.title}
                        </Text>
                    </View>
                </View>
                {program?.workouts?.map((workout: any) => {
                    return (
                        <TouchableOpacity
                            key={workout.id}
                            style={styles.workout}
                            onPress={() =>
                                navigation.navigate('WorkoutDetails', { name: workout.title, workoutId: workout.id })
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
                        </TouchableOpacity>
                    );
                })}
                <View style={styles.backButton}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {!isPublic ? <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(true)}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                    Update Program
                </Text>
            </TouchableOpacity> : null}
            <Modal animationType="slide"
                transparent={true}
                visible={showForm}
            >
                <View style={styles.modal}>
                    <Pressable style={{ position: 'absolute', right: 8, top: 8 }} onPress={() => setShowForm(false)}><Icon name="times" color={theme.colors.text} size={18} /></Pressable>
                    <Text style={{ fontSize: 20, color: theme.colors.text, fontWeight: 'bold', marginBottom: 8 }}>Update Program</Text>
                    <TextInput value={form.title} onChangeText={(v: string) => setForm(prev => {
                        return { ...prev, title: v }
                    })} placeholder='Name' style={styles.input} inputMode={"text"} />
                    <Picker
                        selectedValue={form.category}
                        onValueChange={(v: string) => setForm((prev: any) => {
                            return { ...prev, category: v }
                        })}
                        style={{ borderWidth: 1 }}>
                        {categories.map((category) => {
                            return (
                                <Picker.Item label={category.toUpperCase()} value={category} />
                            )
                        })}
                    </Picker>
                    <Picker
                        selectedValue={form.difficulty_level}
                        onValueChange={(v: string) => setForm((prev: any) => {
                            return { ...prev, difficulty_level: v }
                        })}

                        style={{ borderWidth: 1 }}>
                        {levels.map((category, index) => {
                            return (
                                <Picker.Item key={index + category + index} label={category.toUpperCase()} value={category} />
                            )
                        })}
                    </Picker>
                    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
                        <View style={{ width: '60%', marginTop: 12 }}><Button radius={5} onPress={submit}>Save</Button></View>
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
    backButton: {
        marginLeft: 5,
        position: 'absolute',
        top: 14,
        left: 4,
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
    }
});

export default MyProgramsDetails;
