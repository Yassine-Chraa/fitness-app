import React, { useState } from 'react'
import { emailValidator } from '../../Helpers/emailValidator'
import { useAuth } from '../../context/providers/AuthContextProvider'
import { Alert } from 'react-native'
import EmailType from '../../types/EmailType'
import AuthScreen from './components/AuthScreen';
import Button from './components/Button'
import TextInput from './components/TextInput'
import Logo from './components/Logo'
import Header from './components/Header'

export default function SendResetEmail({ navigation }: any): JSX.Element {
    const [email, setEmail] = useState({ value: '', error: '' });
    const { sendEmail } = useAuth();

    const sendResetPasswordEmail = async () => {
        const emailError = emailValidator(email.value)
        setEmail({ ...email, error: emailError })
        if (emailError == '') {
            const emailObj: EmailType = { email: email.value }
            const sendEmailResult = await sendEmail(emailObj);
            if (sendEmailResult) {
                navigation.navigate("checkCode", null);
            } else {
                Alert.alert('ERROR', "Ooops! something went wrong or email does not exist !", [
                    { text: 'Close', onPress: () => console.log('') },
                ]);
            }
        }
    }

    return (
        <AuthScreen title="Restore Your Password">
            <Logo />
            <Header>Restore Your Password</Header>
            <TextInput
                label="E-mail address"
                returnKeyType="done"
                value={email.value}
                onChangeText={(val: any) => setEmail({ value: val, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                description="You will receive a code in your email."
            />
            <Button
                mode="contained"
                onPress={sendResetPasswordEmail}
                style={{ marginTop: 16 }}
            >
                Send
            </Button>
        </AuthScreen>
    )
}
