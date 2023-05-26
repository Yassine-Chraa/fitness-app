import { TouchableOpacity, Text, StyleSheet, View, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React,{ useState } from 'react';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
const MWRitem = ({
    day,
}: any) => {
    const navigation: any = useNavigation();
    const [isDay, setIsDay] = useState(true);
    const [isAM, setIsAM] = useState(true)
    const [isPM, setIsPM] = useState(false)
    const [isDatetimeOpen, setIsDateTimeOpen] = useState(false);

    const dayActivcationHandler = () => {
        setIsDay((prev) => !prev);
    }

    const AMActivcationHandler = () => {
        setIsPM((prev) => false);
        setIsAM((prev) => true);
    }

    const PMActivcationHandler = () => {
        setIsPM((prev) => true);
        setIsAM((prev) => false);
    }

    const handleConfirm = () => {
        setIsDateTimeOpen(() => false);
    }

    const hideDatePicker = () => {

    }

    const openDateTimePicker = () => {
        setIsDateTimeOpen(() => true);
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
                <TouchableOpacity activeOpacity={0.5} style={{
                    ...styles.container,
                    ...styles.baseBG,
                    marginHorizontal: 6,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                }}>
                    <Text style={styles.Timetext}>00</Text>
                    <Text style={styles.Timetext}>:</Text>
                    <Text style={styles.Timetext}>00</Text>
                    <View>
                        {/* <DateTimePickerModal
                            isVisible={isDatetimeOpen}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        /> */}
                    </View>
                </TouchableOpacity>
                <View style={{ ...styles.container, ...styles.baseBG }}>
                    <TouchableOpacity onPress={() => AMActivcationHandler()} activeOpacity={0.6} style={isAM && isDay ? styles.AMPMColor : null}>
                        <Text style={styles.AMPMtext}>AM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => PMActivcationHandler()} activeOpacity={0.6} style={isPM && isDay ? styles.AMPMColor : null}>
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
