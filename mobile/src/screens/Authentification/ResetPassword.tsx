import React, { useState } from 'react';
import { Alert } from 'react-native';
import Logo from './components/Logo';
import Header from './components/Header';
import Button from './components/Button';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { passwordValidator } from '../../Helpers/passwordValidator';
import { passwordConfirmValidator } from '../../Helpers/passwordConfirmValidator';
import ResetPasswordType from '../../types/ResetPasswordType';
import TextInput from './components/TextInput';
import AuthScreen from './components/AuthScreen'

export default function ResetPassword({ navigation, route }: any): JSX.Element {
    const [password, setPassword] = useState({ value: '', error: '' })
    const [password_confirmation, setPasswordConfirmation] = useState({ value: '', error: '' })
    const { resetPassword } = useAuth();
    const ReceivedCode = route.params;

    const resetPasswordHandler = async () => {
        const passwordError = passwordValidator(password.value)
        const passwordConfirmationError = passwordConfirmValidator(password.value, password_confirmation.value)
        setPassword((prev) => ({ ...prev, error: passwordError }))
        setPasswordConfirmation((prev) => ({ ...prev, error: passwordConfirmationError }))

        if (passwordError == '' && passwordConfirmationError == '') {
            const resetPasswordObj: ResetPasswordType = {
                code: ReceivedCode.code,
                password: password.value,
                password_confirmation: password_confirmation.value
            }
            const resetPasswordResult = await resetPassword(resetPasswordObj);
            if (resetPasswordResult) {
                navigation.navigate("signIn", null);
            } else {
                Alert.alert('ERROR', "Ooops! something went wrong or email does not exist !", [
                    { text: 'Close', onPress: () => console.log('') },
                ]);
            }

        }
    }

    return (
        <AuthScreen title="Restore Your Password">
            <TextInput
                label="New Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={(val: string) => setPassword({ value: val, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />
            <TextInput
                label="Confirm New Password"
                returnKeyType="done"
                value={password_confirmation.value}
                onChangeText={(val: string) => setPasswordConfirmation({ value: val, error: '' })}
                error={!!password_confirmation.error}
                errorText={password_confirmation.error}
                secureTextEntry
            />
            <Button
                mode="contained"
                onPress={resetPasswordHandler}
                style={{ marginTop: 16 }}
            >
                Reset
            </Button>
        </AuthScreen>
    )
}
