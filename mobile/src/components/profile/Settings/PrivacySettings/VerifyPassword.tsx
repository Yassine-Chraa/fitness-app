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


const VerifyPassword = ({ route }: any): JSX.Element => {
    const navigation: any = useNavigation();
    const { currentUser } = useAuth();
    const [user, setUser] = useState<UserType | any>(currentUser?.user)
    const [password, setPassword] = useState({ value: '', error: '' });
    const { email } = route.params;
    const { testSignIn } = useAuth();

    const verifyPasswordHandler = async () => {
        const passwordError = passwordValidator(password.value);
        setPassword({ ...password, error: passwordError });

        if (!password.error) {
            const signObj: SignInObj = { email: email, password: password.value }
            const resutl = await testSignIn(signObj);
            if (resutl) {
                navigation.navigate('ChangePassword', { oldPassword: password.value })
            } else {
                setPassword({ ...password, error: "This is not your old Password !!" });
            }
        }
    };

    return (
        <Screen
            name={'Privacy Settings'}
            backButton
            allowScroll>

            <View style={styles.PSContainer}>
                <View style={{ marginBottom: 16 }}>
                    <Text style={styles.title}>Old Password</Text>
                    <Text style={styles.sectionText}>
                        Just to make sure it's you, please enter
                    </Text>
                    <Text style={styles.sectionText}>
                        your old Password down below
                    </Text>
                </View>

                <CustomTextInput
                    placeholder="Your Password ..."
                    value={password.value}
                    onChangeText={(val: string) => setPassword({ value: val, error: '' })}
                    errorText={password.error}
                    secureTextEntry
                />

                <View style={styles.forgotPassword}>
                    <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordForUpdate')}>
                        <Text style={styles.forgot}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>

                <Button onPress={verifyPasswordHandler} title="Next" color={"#00008B"} />
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
        marginVertical: 40,
        paddingVertical: 40,
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000a',
        marginTop: 30,
    },

    sectionButton: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: theme.colors.textInput,
        borderRadius: 8,
    },
    sectionText: {
        color: '#00008B',
        fontSize: 15,
        fontWeight: '400',
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

export default VerifyPassword;