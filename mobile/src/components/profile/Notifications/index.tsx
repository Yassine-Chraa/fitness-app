import React from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    Alert,
    Platform,
} from 'react-native';
import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { useNotification } from '../../../context/providers/NotificationContextProvider';

PushNotification.configure({
    requestPermissions: Platform.OS === 'ios',
    onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
});

PushNotification.createChannel(
    {
        channelId: 'FitnessAppID', // (required)
        channelName: 'DemoApp', // (required)
        importance: Importance.HIGH,
        vibrate: true,
        // soundName: '',
        channelDescription: 'Channel description bla bla bla...'
    },
    created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);


const Notifications = () => {

    const setRepeatingNotification = (interval: any) => {
        PushNotification.cancelAllLocalNotifications()
        if (interval == "5s") {
            PushNotification.localNotificationSchedule({
                title: "My notification title",
                message: "My notification message",
                date: new Date(Date.now() + 5 * 1000), // first trigger in 30 secs
                channelId: 'FitnessAppID',
                repeatType: 'time',
                repeatTime: 5 * 1000 // repeats every 30 seconds (value has to be defined in miliseconds when the repeatType is 'time')
            });
            Alert.alert("Successful!", "Your notification is coming in 30 seconds and will repeat itself every 30 seconds.")
        }
        else if (interval == "10s") {
            PushNotification.localNotificationSchedule({
                title: "My notification title",
                message: "My notification message",
                date: new Date(Date.now() + 10 * 1000), // first trigger in 10 secs
                channelId: 'FitnessAppID',
                repeatType: 'day',
                repeatTime: 2, // repeats every 2 days
            });
            Alert.alert("Successful!", "Your notification is coming in 10 seconds and will repeat itself once in two days.")
        }
        else if (interval == "30s") {
            PushNotification.localNotificationSchedule({
                title: "My notification title",
                message: "My notification message",
                date: new Date(Date.now() + 10 * 1000), // first trigger in 10 secs
                channelId: 'FitnessAppID',
                repeatType: 'week',
                repeatTime: 1 // repeats every week
            });
            Alert.alert("Successful!", "Your notification is coming in 10 seconds and will repeat itself every week.")
        }
    }


    const { setReminder, generateSimpleNotification } = useNotification()

    // const myNotification = async (currentDate: Date, day: string) => {
    //     PushNotification.cancelLocalNotification('123')

    //     const reminderTime = new Date();
    //     reminderTime.setHours(currentDate.getHours());
    //     reminderTime.setMinutes(currentDate.getMinutes());
        
    //     reminderTime.setSeconds(0);


    //     PushNotification.localNotificationSchedule({
    //         title: "Your workout Reminder",
    //         message: `It's ${reminderTime.getHours()}:${reminderTime.getMinutes()}! Time to get moving! Take a break from your busy day and prioritize your health and fitness. Engage in a workout session now and make progress towards your goals. Remember, consistency is key. Stay motivated and keep pushing yourself!`,
    //         date: new Date(Date.now() + 3 * 1000),
    //         channelId: 'FitnessAppID',
    //         repeatType: 'time',
    //         repeatTime: 4000,
    //         id: '123'
    //     });
    // }

    return (
        <SafeAreaView style={styles.backgroundStyle}>

            <StatusBar barStyle='dark-content' backgroundColor='white' />

            <TouchableOpacity style={styles.primaryButton} onPress={() => { setRepeatingNotification("5s") }}>
                <Text>5 Seconds</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={() => { setRepeatingNotification("10s") }}>
                <Text>10 Seconds</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton}
                onPress={() => setReminder(new Date(Date.now() +  1000),"1",false)}>
                <Text>My notification</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={() => generateSimpleNotification({
                subText: 'í am the subtext of your notification',
                message: 'i am the main message of your notification',
                bigText: "i am the very very big text or content of your notification my friend !"
            })}>
                <Text>20 Seconds</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={() => { setRepeatingNotification("30s") }}>
                <Text>30 Seconds</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={() => { PushNotification.cancelAllLocalNotifications() }}>
                <Text>cancel all notifications</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryButton: {
        padding: 5,
        backgroundColor: '#CDF2CA',
        borderRadius: 5,
        margin: 10
    },
    secondaryButton: {
        padding: 5,
        backgroundColor: '#ffc2c2',
        borderRadius: 5,
        margin: 10
    }
});

export default Notifications;