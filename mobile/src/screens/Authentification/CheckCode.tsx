import React, { useState } from 'react'
import Logo from './components/Logo'
import Header from './components/Header'
import Button from './components/Button'
import { codeValidator } from '../../Helpers/codeValidator'
import { View, Alert } from 'react-native';
import CodeType from '../../types/CodeType'
import { useAuth } from '../../context/providers/AuthContextProvider'
import AuthScreen from './components/AuthScreen'
import TextInput from './components/TextInput'

export default function CheckCode({ navigation }: any): JSX.Element {
    const [code, setCode] = useState({ value: '', error: '' })
    const { checkCode } = useAuth();

    const ckeckCodeHandler = async () => {
        const codeError = codeValidator(code.value)
        setCode({ ...code, error: codeError })

        if (codeError == '') {
            const codeObj: CodeType = { code: code.value }
            const checkCodeResult = await checkCode(codeObj);
            if (checkCodeResult) {
                navigation.navigate("resetPassword", codeObj);
            } else {
                Alert.alert('ERROR', "Ooops! something went wrong or email does not exist !", [
                    { text: 'Close', onPress: () => console.log('') },
                ]);
            }

        }


    }

    return (
        <AuthScreen title="Checking Your Code">
            <View >
                <TextInput
                    label="Your Code Here"
                    returnKeyType="done"
                    value={code.value}
                    onChangeText={(val: any) => setCode({ value: val, error: '' })}
                    error={!!code.error}
                    errorText={code.error}
                    autoCompleteType="numeric"
                    textContentType="numeric"
                    keyboardType="numeric"
                    description="Type the code you received in your email."
                    style={{ width: 300 }}
                />
            </View>
            <Button
                mode="contained"
                onPress={ckeckCodeHandler}
                style={{ marginTop: 18, width: 300 }}
            >
                Verify Code
            </Button>
        </AuthScreen>
    )
}
