import React from 'react';
import { StyleSheet, View } from 'react-native';
import Option from '../Option';
import theme from '../../../constants/theme';
import SettingSwitch from './SettingSwitch';
import { useNavigation } from '@react-navigation/native';

const SettingsOptions = (): any => {
    const navigation: any = useNavigation();
    

    return (
        <View style={styles.container}>
            <Option
                title="Manage Workout Reminder"
                iconName="user-alt"
                BadgeColor={theme.colors.primary}
                link={'ManageWorkOutReminder'}
            />
            <Option
                title="Enable Location Services"
                iconName="dumbbell"
                BadgeColor={theme.colors.secondary}
                link={'GymLocation'}
            />
            <Option
                title="Privacy Settings"
                iconName="wrench"
                BadgeColor={theme.colors.text}
                link={'VerifyEmail'}
            />
            <SettingSwitch
                title="Connect to Google Fit"
                BadgeColor={theme.colors.text}
            />
            <SettingSwitch
                title="Light Mode"
                type="dark"
                BadgeColor={theme.colors.text}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        marginTop: 4,
        marginBottom: 4,
        borderColor: "#222",
    },
});

export default SettingsOptions;
