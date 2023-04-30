import { Image } from '@rneui/themed';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, Pressable, TextInput, ScrollView } from 'react-native';
import { Button } from '@rneui/base';
import theme from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';

const MyProgramsDetails = ({ navigation, route }: any) => {
    const { program } = route.params
    return (
        <View style={{ paddingHorizontal: 12, flex: 1 }}>
            <ScrollView>
                <View style={{ marginBottom: 12 }}>
                    <Image
                        style={{ width: '100%', height: 180, borderRadius: 12 }}
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
                        <Text style={{ fontSize: 18, color: '#fff' }}>Bulking 3 Days</Text>
                        <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold' }}>
                            Push/Pull/Legs Program
                        </Text>
                    </View>
                </View>
                {program?.workouts?.map((workout: any) => {
                    return (
                        <TouchableOpacity
                            key={workout.id}
                            style={styles.workout}
                            onPress={() =>
                                navigation.navigate('WorkoutDetails', { name: workout.title, exercises: workout.exercises })
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
            <TouchableOpacity style={styles.addButton}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
                    Add Day to Program
                </Text>
            </TouchableOpacity>
            <Modal animationType="slide"
                transparent={true}
                visible={true}
            >
                <View style={styles.modal}>
                    <Pressable style={{ position: 'absolute', right: 8, top: 8 }}><Icon name="times" color={theme.colors.text} size={18} /></Pressable>
                    <Text style={{ fontSize: 20, color: theme.colors.text, fontWeight: 'bold' }}>{true ? "Edit" : "Add"} Weight</Text>
                    <TextInput placeholder='Name' style={styles.input} inputMode={"text"} />
                    <TextInput placeholder='Day' style={styles.input} inputMode={"text"} />
                    <Picker
                        onValueChange={(v: string) => console.log(v)}
                        style={{ borderWidth: 1 }}>
                        <Picker.Item label="Bronze" value="bronze" />
                        <Picker.Item label="Silver" value="silver" />
                        <Picker.Item label="gold" value="gold" />
                    </Picker>
                    <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
                        <View style={{ width: '60%', marginTop: 8 }}><Button radius={5}>Add</Button></View>
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
        top: 8,
        left: 8,
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
