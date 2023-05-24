import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import UserType from '../../../../types/UserType';
import { useAuth } from '../../../../context/providers/AuthContextProvider';
import Screen from '../../../Screen';
import CustomTextInput from '../../../authentification/CustomTextInput';
import theme from '../../../../constants/theme';
import { passwordValidator } from '../../../../Helpers/passwordValidator';
import { Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import SignInObj from '../../../../types/SignInObj';
import UserPasswordType from '../../../../types/UserPasswordType';


const ChangePassword = ({ route }: any): JSX.Element => {
    const navigation: any = useNavigation();
    const { currentUser } = useAuth();
    const [user, setUser] = useState<UserType | any>(currentUser?.user)
    const [password, setPassword] = useState({ value: '', error: '' });
    const [password_confirmation, setPassword_confirmation] = useState({ value: '', error: '' });
    const { oldPassword } = route.params;
    const { testSignIn, updateUserPassword } = useAuth();


    const updatePasswordHandler = async () => {
        const passwordError = passwordValidator(password.value);
        setPassword({ ...password, error: passwordError });

        if (password_confirmation.value != password.value) {
            setPassword_confirmation({ ...password_confirmation, error: "Passowrds don't match !" })
        }

        if (!password.error && password_confirmation.value == password.value) {
            if (password.value == oldPassword) {
                setPassword({ ...password, error: "Please, Enter a new password !" });
            } else {
                const updateObj: UserPasswordType = {
                    id: user.id,
                    password: oldPassword,
                    nvPassword: password.value,
                    type: 'passwordForm',
                }
        
                const resutl = await updateUserPassword(updateObj);
                if (resutl) {
                    navigation.navigate('Settings')
                } else {
                    setPassword({ ...password, error: "Ooops !,Something went wrong !" });
                }
            }
        }
    };

    return (
        <Screen
            name={'Privacy Settings'}
            backButton
            allowScroll
            action="save"
            actionFunction={updatePasswordHandler}>

            <View style={styles.PSContainer}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.title}>Create New Password</Text>
                    <Text style={styles.sectionText}>
                        Your new password must be different from
                    </Text>
                    <Text style={styles.sectionText}>
                        previous used password.
                    </Text>
                </View>

                <Text style={styles.label}>New Password</Text>
                <CustomTextInput
                    placeholder="Your new password ..."
                    value={password.value}
                    onChangeText={(val: string) => setPassword({ value: val, error: '' })}
                    errorText={password.error}
                    description={'must be at least 8 charachters.'}
                    secureTextEntry
                />

                <Text style={styles.label}>Confirm New Password</Text>
                <CustomTextInput
                    placeholder="Confirm it here ..."
                    value={password_confirmation.value}
                    onChangeText={(val: string) => setPassword_confirmation({ value: val, error: '' })}
                    errorText={password_confirmation.error}
                    description={'Both passwords must match !'}
                    secureTextEntry
                />

                <Button onPress={updatePasswordHandler} title="Next" color={"#00008B"} />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    PSContainer: {
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
        height: '100%',
        marginVertical: 20,
        paddingVertical: 20,
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000a',
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000',
        marginTop: 10,
    },
    sectionText: {
        color: '#00008B',
        fontSize: 15,
        fontWeight: '400',
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: '#00008B',
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
});

export default ChangePassword;