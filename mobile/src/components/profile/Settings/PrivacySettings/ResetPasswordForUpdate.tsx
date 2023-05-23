import React, { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../../context/providers/AuthContextProvider';
import { emailValidator } from '../../../../Helpers/emailValidator';
import Screen from '../../../Screen';
import CustomTextInput from '../../../authentification/CustomTextInput';
import { Button, View, Text, StyleSheet } from 'react-native';

const ResetPasswordForUpdate = () => {
    const { resetPassword } = useAuth();
    const navigation: any = useNavigation();
    const [email, setEmail] = useState({ value: '', error: '' });
    const [message, setMessage] = useState('');

    const sendResetPasswordEmail = () => {
        const emailError = emailValidator(email.value);
        if (emailError) {
            setEmail({ ...email, error: emailError });
        } else {
            resetPassword(email.value).then((res) => {
                setMessage(res);
                navigation.navigate('Settings');
            });
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            setEmail({ value: '', error: '' });
            return () => { };
        }, []),
    );

    return (
        <Screen
            name={'Privacy Settings'}
            backButton
            allowScroll>


            <View style={{ marginBottom: 20 }}>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.sectionText}>
                    Please, Provide us with a valide email of your account.
                    You will receive an email from fitnessApp.
                </Text>
            </View>
            <CustomTextInput
                placeholder="E-mail address"
                returnKeyType="done"
                value={email.value}
                onChangeText={(val: any) => setEmail({ value: val, error: '' })}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                description={message}
            />
            <Button onPress={sendResetPasswordEmail} title="Next" color={"#00008B"} />
        </Screen>
    );
}

export default ResetPasswordForUpdate;

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
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
})