import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../../constants/theme';
import UserNameModal from './UserNameModal';

export const Item = ({ setState, fieldName, fieldValue }: any): JSX.Element => {
    return (
        <TouchableOpacity onPress={() => setState(true)} activeOpacity={0.7} style={itemStyle.container}>
            <Text style={itemStyle.key}>{fieldName}</Text>
            <View style={itemStyle.dataContainer}>
                <Text style={itemStyle.value}>{fieldValue}</Text>
                <Icon name={'chevron-right'} size={12} color={'#222'} />
            </View>
        </TouchableOpacity>
    );
};

const itemStyle = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 5,
        backgroundColor: '#888'
    },
    dataContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    key: {
        fontSize: 18,
        fontWeight: '400',
        color: '#333',
    },
    value: {
        fontSize: 18,
        fontWeight: '300',
        color: 'blue',
        marginEnd: 10,
    }
});


const EditProfile = (): JSX.Element => {
    const [isUserNameModalOpen, setIsUserNameModalOpen] = useState(false);
    const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false);
    const [name, setName] = useState({ value: '', error: '' });
    const [date, setDate] = useState(new Date())

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.7}>
                    <Image source={require('../../../assets/images/gym.jpg')} style={styles.headerImage} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.4}>
                    <Text style={styles.headerUpload}>Change Profile PHoto</Text>
                </TouchableOpacity>
            </View>
            {/* --------------( click handlers )--------------- */}
            <Item setState={setIsUserNameModalOpen} fieldName={'User Name'} fieldValue={name.value} />
            <Item setState={setIsDatePickerModalOpen} fieldName={'Birthday'} fieldValue={"2000-02-02"} />

            <DatePicker
                modal
                open={isDatePickerModalOpen}
                date={date}
                onConfirm={(date) => {
                    setIsDatePickerModalOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setIsDatePickerModalOpen(false)
                }}
            />




            {/* --------------( modals )--------------- */}
            <UserNameModal
                isUserNameModalOpen={isUserNameModalOpen}
                setIsUserNameModalOpen={setIsUserNameModalOpen}
                name={name}
                setName={setName}
            />


        </View>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 14
    },
    headerImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginTop: 10,
        marginBottom: 6
    },
    headerUpload: {
        textTransform: 'uppercase',
        fontSize: 20,
        fontWeight: '500',
        color: 'blue',
        padding: 8,
        backgroundColor: '#ddd'
    },


});