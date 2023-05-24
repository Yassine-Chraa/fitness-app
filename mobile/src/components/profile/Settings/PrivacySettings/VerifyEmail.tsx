import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import UserType from '../../../../types/UserType';
import Screen from '../../../Screen';
import CustomTextInput from '../../../authentification/CustomTextInput';
import theme from '../../../../constants/theme';
import { Button } from '@rneui/base';
import { emailValidator } from '../../../../Helpers/emailValidator';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../../context/providers/AuthContextProvider';


const VerifyEmail = (): JSX.Element => {
    const navigation: any = useNavigation();
    const { currentUser } = useAuth();
    const [user, setUser] = useState<UserType | any>(currentUser?.user)
    const [email, setEmail] = useState({ value: '', error: '' });

    const verifyEmailHandler = async () => {
        const EmailError = emailValidator(email.value);

        setEmail({ ...email, error: EmailError });
        if (email.value == user.email) {
            navigation.navigate('VerifyPassword',{email: email.value})
        } else {
            setEmail({ ...email, error: "This is not your current email !!" })
        }
    };


    return (
        <Screen
            name={'Privacy Settings'}
            backButton
            allowScroll>

            <View style={styles.PSContainer}>
                <View>
                    <Text style={styles.title}>Reset Password</Text>
                    <Text style={styles.sectionText}>
                        Provide the email associated with it. We require your email
                        to verify your identity and facilitate the password
                        reset process in the event of a forgotten password.
                    </Text>
                </View>

                <View>
                    <Text style={styles.EmailTitle}>Email Address</Text>
                    <CustomTextInput
                        placeholder="Your Email ..."
                        value={email.value}
                        onChangeText={(val: string) => setEmail({ value: val, error: '' })}
                        errorText={email.error}
                    />
                </View>
                <Button onPress={verifyEmailHandler} title="Next" color={"#00008B"} />
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

    EmailTitle: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#000a',
        marginTop: 30,
    },

    sectionText: {
        color: '#00008B',
        fontSize: 15,
        fontWeight: '400',
        marginTop: 5,
        marginBottom: 0,
    },

    sectionButton: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
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
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    forgotEmail: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
});

export default VerifyEmail;