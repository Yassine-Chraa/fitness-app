import React, { useState } from 'react'
import Background from './components/Background'
import BackButton from './components/BackButton'
import Logo from './components/Logo'
import Header from './components/Header'
import TextInput from './components/InputText'
import Button from './components/Button'
import { codeValidator } from '../../Helpers/codeValidator'
import { View, Alert } from 'react-native';
import CodeType from '../../types/CodeType'
import { useAuth } from '../../context/providers/AuthContextProvider'

export default function CheckCode({ navigation }: any): JSX.Element {
    const [code, setCode] = useState({ value: '', error: '' })
    const {checkCode} = useAuth();

    const ckeckCodeHandler = async () => {
        const codeError = codeValidator(code.value)
        setCode({ ...code, error: codeError })

        if (codeError == '') {
            const codeObj:CodeType = {code: code.value}
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
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Checking Your Code</Header>
            <View style={{ width: 200 }}>
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

                />
            </View>
            <Button
                mode="contained"
                onPress={ckeckCodeHandler}
                style={{ marginTop: 15, width: 200 }}
            >
                Verify Code
            </Button>
        </Background>
    )
}
