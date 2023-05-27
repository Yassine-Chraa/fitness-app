import { TouchableOpacity, Text, StyleSheet, View, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import { useNotification } from '../../../../context/providers/NotificationContextProvider';
// import DateTimePickerModal from "react-native-modal-datetime-picker";

const REF_DATE = new Date()

const MWRitem = ({ day, dayID }: any): JSX.Element => {
    const navigation: any = useNavigation();
    const [isDay, setIsDay] = useState(false);
    const [isAM, setIsAM] = useState(true)
    const [date, setDate] = useState<Date>(new Date(REF_DATE.getFullYear(), REF_DATE.getMonth(), REF_DATE.getDate(), 0, 0, 0))
    const [open, setOpen] = useState<boolean>(false);
    const { setReminder } = useNotification();

    const dayActivcationHandler = () => {
        setIsDay((prev) => !prev);
        if (!isDay) {
            const d = date;
            d.setHours(isAM ? d.getHours() : d.getHours() + 12);
            (async () => await AsyncStorage.setItem(`is${day}`, "true"))();
            setReminder(d, day, dayID, false);
        } else {
            (async () => await AsyncStorage.removeItem(`is${day}`))();
            setReminder(date, day, dayID, true);
        }
    }

    const AMActivcationHandler = () => {
        setIsAM((prev) => true);
    }

    const PMActivcationHandler = () => {
        setIsAM((prev) => false);
    }

    useEffect(() => {
        (async () => {
            await AsyncStorage.getItem(`${day}`).then(date => {
                const arr = date ? date.split(":") : ["0", "0", 'AM'];
                const newDate = new Date();
                newDate.setHours(parseInt(arr[0]));
                newDate.setMinutes(parseInt(arr[1]));
                newDate.setDate(newDate.getDate() + ((dayID + 7 - newDate.getDay()) % 7));
                setIsAM(() => arr[2] === 'AM');
                setDate(() => newDate);
            });
        })();

        (async () => await AsyncStorage.getItem(`is${day}`).then(isCurrentDay => {
            setIsDay(() => isCurrentDay === "true");
        })
        )();
    }, [])

    const getFormattedDate = () => {
        const newDate = new Date(date);
        newDate.setHours(!isAM ? date.getHours() + 12 : date.getHours())
        return newDate;
    }

    const ondatePickerAction = (currentDate: Date) => {
        const currentIsAM = currentDate.getHours() >= 0 && currentDate.getHours() < 12;
        const hour = currentIsAM ? currentDate.getHours() : (currentDate.getHours() - 12);
        currentDate.setHours(hour);
        setIsAM(() => currentIsAM);
        setOpen(false);
        setDate(() => currentDate);
        (async () => await AsyncStorage.setItem(`${day}`,
            `${hour}:${currentDate.getMinutes()}:${currentIsAM ? 'AM' : 'PM'}`))();
        setReminder(currentDate, day, dayID, false);
    }

    return (
        <View
            style={styles.wrapper}
        >
            <TouchableOpacity onPress={() => dayActivcationHandler()} activeOpacity={0.6}
                style={styles.container}>
                <Text style={{
                    ...styles.daytext,
                    ...styles.baseBG,
                    backgroundColor: isDay ? "#1A73ff" : "#000",
                }}>{day}</Text>
            </TouchableOpacity>
            <View style={styles.wrapper}>
                <TouchableOpacity activeOpacity={0.5}
                    onPress={() => isDay && setOpen(() => true)}
                    style={{
                        ...styles.container,
                        ...styles.baseBG,
                        marginHorizontal: 6,
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                    }}>
                    <Text style={styles.Timetext}>{date.getHours()}</Text>
                    <Text style={styles.Timetext}>:</Text>
                    <Text style={styles.Timetext}>{date.getMinutes()}</Text>

                    <DatePicker
                        modal locale="en" mode="time" open={open}
                        date={new Date(getFormattedDate())}
                        onConfirm={currentDate => ondatePickerAction(currentDate)}
                        onCancel={() => {
                            setOpen(false);
                        }} />
                </TouchableOpacity>
                <View style={{ ...styles.container, ...styles.baseBG }}>
                    <TouchableOpacity onPress={() => AMActivcationHandler()} activeOpacity={0.6} style={isAM && isDay ? styles.AMPMColor : null}>
                        <Text style={styles.AMPMtext}>AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => PMActivcationHandler()} activeOpacity={0.6} style={!isAM && isDay ? styles.AMPMColor : null}>
                        <Text style={styles.AMPMtext}>PM</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
    },
    daytext: {
        color: "#eee",
        fontSize: 18,
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    Timetext: {
        color: "#eee",
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 4
    },
    AMPMtext: {
        color: "#eee",
        fontSize: 16,
        marginHorizontal: 8,
        marginVertical: 4,
        marginLeft: 8,
        paddingVertical: 3,
    },
    baseBG: {
        backgroundColor: "#000",
        borderRadius: 8,
    },
    AMPMColor: {
        backgroundColor: "#1A73ff",
        borderRadius: 8,
    },
});

export default MWRitem;
