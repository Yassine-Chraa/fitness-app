import { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import UserDesc from '../../components/profile/UserDesc';
import { useAuth } from '../../context/providers/AuthContextProvider';
import SettingsOptions from '../../components/profile/SettingsOptions';
import FullDropDownList from '../../components/profile/FullDropDownList';
import Devider from '../../components/tinyCompo/Devider';

const Settings = ({ route, navigation }: any) => {

    const { currentUser } = useAuth();
    const user = currentUser?.user;

    const [open, setOpen] = useState(false);
    const updateProfile = () => {
        navigation.goBack();
    };
    return (
        <Screen
            name={'Settings'}
            backButton
            action="save"
            actionFunction={updateProfile}>
            <ScrollView>
                <UserDesc
                    userInfo={{
                        profile: user?.profile,
                        name: user?.name,
                        workout_level: user?.workout_level,
                        top_goal: user?.top_goal,
                    }}
                />
                <Devider />
                <SettingsOptions />
                <Devider />
                <FullDropDownList />
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
export default Settings;