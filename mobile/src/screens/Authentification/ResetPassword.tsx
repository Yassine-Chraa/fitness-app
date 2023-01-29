import React, { useState } from 'react'
import Background from './components/Background'
import BackButton from './components/BackButton'
import Logo from './components/Logo'
import Header from './components/Header'
import TextInput from './components/InputText'
import Button from './components/Button'
import { emailValidator } from '../../Helpers/emailValidator'

export default function ResetPassword({ navigation }:any):JSX.Element {
    const [email, setEmail] = useState({ value: '', error: '' })

    const sendResetPasswordEmail = () => {
        const emailError = emailValidator(email.value)
        if (emailError) {
            setEmail({ ...email, error: emailError })
            return
        }
        // redirect to sign in screen screen
    }

    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Reset Your Password</Header>
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
                description="You will receive email with password reset link."
            />
            <Button
                mode="contained"
                onPress={sendResetPasswordEmail}
                style={{ marginTop: 16 }}
            >
                Send
            </Button>
        </Background>
    )
}
