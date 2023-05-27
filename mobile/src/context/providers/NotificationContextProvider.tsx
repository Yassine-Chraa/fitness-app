import React, { createContext, useContext } from 'react';
import PushNotification, { Importance } from "react-native-push-notification";
import { Platform } from 'react-native';

export type NotificationContextType = {
    generateSimpleNotification: (NotificationProps: any) => any;
    setReminder: (date: Date, day: string, dayId: string, isStop: boolean) => void;

};

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
        // soundName: '',
        channelDescription: 'Channel description bla bla bla...'
    },
    created => console.log(`createChannel returned '${created}'`),
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

    const setReminder = (date: Date, day: string, dayId: string, isStop: boolean) => (isStop ? PushNotification.cancelLocalNotification(day) : reminderTemplate(date, day, dayId));

    const reminderTemplate = async (date: Date, day: string, dayId: string) => {
        PushNotification.cancelLocalNotification(day)
        const reminderTime = new Date();
        reminderTime.setHours(date.getHours());
        reminderTime.setMinutes(date.getMinutes());
        reminderTime.setSeconds(0);

        PushNotification.localNotificationSchedule({
            id: dayId,
            title: "Your workout Reminder",
            message: `It's ${reminderTime.getHours()}:${reminderTime.getMinutes()}! Time to get moving! Take a break from your busy day and prioritize your health and fitness. Engage in a workout session now and make progress towards your goals. Remember, consistency is key. Stay motivated and keep pushing yourself!`,
            date: reminderTime,
            channelId: 'FitnessAppID',
            repeatType: 'time',
            repeatTime: 3000,
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
