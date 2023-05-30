import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../../../context/providers/AuthContextProvider';
import Devider from '../../../tinyCompo/Divider';
import Screen from '../../../Screen';
import theme from '../../../../constants/theme';
import MWRswitch from './MWRswitch';
import MWRitem from './MWRitem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ManageWorkOutReminder = ({ route, navigation }: any) => {
    const { currentUser } = useAuth();
    const user = currentUser?.user;
    const [isNotification, setIsNotification] = useState<boolean>(false);
    const [isDaily, setIsDaily] = useState<boolean>(false);
    const [isReminderMe, setIsReminderMe] = useState<boolean>(false);

    const updateProfile = () => {
        navigation.goBack();
    };


    useEffect(() => {
        (async () => await AsyncStorage.getItem('isNotification').then(isNotify => { setIsNotification(() => isNotify == `${true}`); }))();
        (async () => await AsyncStorage.getItem('isDaily').then(data => { setIsDaily(() => data == `${true}`); }))();
        (async () => await AsyncStorage.getItem('isReminder').then(data => { setIsReminderMe(() => data == `${true}`); }))();
    }, [])

    const onActivateNotifications = () => {
        setIsNotification(() => !isNotification);
        (async () => await AsyncStorage.setItem('isNotification', `${!isNotification}`))();
        if (isNotification) {
            setIsDaily(() => false);
            setIsReminderMe(() => false);
        }
    }
    const onActivateDaily = () => {
        setIsDaily(() => !isDaily);
        (async () => await AsyncStorage.setItem('isDaily', `${!isDaily}`))();
    }
    const onActivateRemindeMe = () => {
        setIsReminderMe(() => !isReminderMe);
        (async () => await AsyncStorage.setItem('isReminder', `${!isReminderMe}`))();
    }


    return (
        <Screen
            name={'WorkOut Reminder'}
            backButton
            action="save"
            actionFunction={updateProfile}>
            <ScrollView>
                <MWRswitch title="Push Notifications" isAllowed={true} isActive={isNotification} onAction={onActivateNotifications} />
                <MWRswitch title="Remind me if inactive for weeks" isAllowed={isNotification} isActive={isReminderMe} onAction={onActivateRemindeMe} />
                <MWRswitch title="Daiy Workout Reminder" isAllowed={isNotification} isActive={isDaily} onAction={onActivateDaily} />

                <Devider />

                <MWRitem isNotification={isNotification} isDialy={isDaily} day="Monday" dayID={1} />
                <MWRitem isNotification={isNotification} isDialy={isDaily} day="Tuesday" dayID={2} />
                <MWRitem isNotification={isNotification} isDialy={isDaily} day="Wednesday" dayID={3} />
                <MWRitem isNotification={isNotification} isDialy={isDaily} day="Thursday" dayID={4} />
                <MWRitem isNotification={isNotification} isDialy={isDaily} day="Friday" dayID={5} />
                <MWRitem isNotification={isNotification} isDialy={isDaily} day="Saturday" dayID={6} />
                <MWRitem isNotification={isNotification} isDialy={isDaily} day="Sunday" dayID={0} />
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    heading: {
        marginBottom: 32,
        marginTop: 16,
        alignItems: 'center',
        width: 90,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: theme.colors.statusBar,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text,
        marginTop: 12,
    },
    subTitle: {
        fontSize: 18,
        color: theme.colors.text,
        fontWeight: '600',
    },
    toggle: {
        flexDirection: 'row',
        columnGap: 8,
        marginTop: 8,
    },
    toggleButton: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: theme.colors.textInput,
        borderRadius: 8,
    },
    toggleText: {
        color: theme.colors.text,
    },
    dateButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderColor: theme.colors.statusBar,
        borderWidth: 1,
    },
});
export default ManageWorkOutReminder;