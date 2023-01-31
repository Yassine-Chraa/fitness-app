import React, { useState } from 'react'
import AuthScreen from './components/AuthScreen'
import TextInput from './components/TextInput'
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
        <AuthScreen title="Reset Your Password">
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
        </AuthScreen>
    )
}
