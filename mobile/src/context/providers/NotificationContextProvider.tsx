import React, { createContext, useContext } from 'react';
import PushNotification, { Importance } from "react-native-push-notification";
import { Platform } from 'react-native';

export type NotificationContextType = {
    generateSimpleNotification: (NotificationProps: any) => any;
    setReminder: (date: Date, dayId: string, isStop: boolean) => void;
};

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('Notification Provider is missing');
    return context;
};


PushNotification.configure({
    requestPermissions: Platform.OS === 'ios',

    onAction: function (notification) {
        if (notification.action === "Close") {
            console.log("text", notification.message)
        } else if (notification.action === "Take Action") {
            console.log("text", notification.message)
        }
    },

    onNotification: function (notification) {
        console.log('NOTIFICATION:', notification.message);
    },
});





PushNotification.createChannel(
    {
        channelId: 'FitnessAppID',
        channelName: 'FitnessApp',
        importance: Importance.HIGH,
        vibrate: true,
        channelDescription: 'Channel description bla bla bla...'
    },
    created => console.log(`createChannel returned '${created}'`),
);

PushNotification.createChannel(
    {
        channelId: "FitnessAppID-sound-channel",
        channelName: `Sound channel`,
        channelDescription: "A sound channel",
        soundName: "gratfull_notification.mp3",
        importance: 4,
        vibrate: true,
    },
    (created) => console.log(`createChannel 'FitnessAppID-sound-channel' returned '${created}'`)
);


export const NotificationContextProvider = ({ children }: any) => {


    const generateSimpleNotification = (NotificationProps: any) => {
        const { subText, message, bigText } = NotificationProps;
        PushNotification.localNotification({
            channelId: "FitnessAppID",
            largeIcon: "fitness_app_logo",
            largeIconUrl: "",
            smallIcon: "ic_notification",
            bigText: bigText ? bigText : "i am the big text of your notification !",
            subText: subText ? subText : "",
            bigPictureUrl: "fitness_app_logo",
            bigLargeIcon: "fitness_app_logo",
            bigLargeIconUrl: "",
            color: "blue",
            vibrate: true,
            vibration: 1000,
            tag: "some_tag",
            group: "group",
            groupSummary: false,
            ongoing: false,
            priority: "high",
            visibility: "private",
            ignoreInForeground: false,
            shortcutId: "shortcut-id",
            onlyAlertOnce: false,
            when: null,
            usesChronometer: false,
            timeoutAfter: null,
            messageId: "google:message_id",
            actions: ["Close", "Action"],
            invokeApp: true,
            message: message ? message : "Notification Message Here",
        });
    }

    const setReminder = (date: Date, dayId: string, isStop: boolean) => (isStop ? PushNotification.cancelLocalNotification(dayId) : reminderTemplate(date, dayId));

    const reminderTemplate = async (date: Date, dayId: string) => {
        PushNotification.cancelLocalNotification(dayId)
        if (date < new Date()) { date.setDate(date.getDate() + 7); }
        const reminderTime = new Date(date);
        const currentDayOfWeek = reminderTime.getDay();
        const daysToAdd = parseInt(dayId) - currentDayOfWeek;
        reminderTime.setDate(reminderTime.getDate() + daysToAdd);

        console.log("[date inside reminder] |===> [" + reminderTime + "]");

        PushNotification.localNotificationSchedule({
            id: dayId,
            title: `Remember, It is ${daysOfWeek[reminderTime.getDay()]} ${reminderTime.getHours()}:${reminderTime.getMinutes()} workout Reminder`,
            message: "Maintain your momentum and stay committed, my friend!",
            date: reminderTime,
            channelId: 'FitnessAppID-sound-channel',
            repeatType: 'week',
            repeatTime: 7 * 24 * 60 * 60 * 1000,
            largeIcon: "fitness_app_logo",
            smallIcon: "ic_notification",
            bigText: `Stay on track with your fitness goals! Don't let today's
                opportunity slip away. Remember to prioritize your well-being 
                and carve out time for exercise. Whether it's a workout at the gym, a refreshing jog, or a 
                yoga session, make a commitment to your health. You've come so far, and this is your chance to keep the momentum going. 
                Let's continue this journey together and achieve greatness!`,
            subText: "FitnessApp Reminder",
            bigLargeIcon: "fitness_app_logo",
            color: "blue",
            vibrate: true,
            vibration: 1000,
            tag: "some_tag",
            group: "group",
            groupSummary: false,
            ongoing: false,
            priority: "high",
            visibility: "private",
            ignoreInForeground: false,
            shortcutId: "shortcut-id",
            onlyAlertOnce: false,
            playSound: true,
        });
    }


    return (
        <NotificationContext.Provider
            value={{
                generateSimpleNotification,
                setReminder,
            }}>
            {children}
        </NotificationContext.Provider>
    );
};
