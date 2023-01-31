import React, {useState} from 'react';
import AuthScreen from './components/AuthScreen';
import TextInput from './components/TextInput';
import Button from './components/Button';
import {emailValidator} from '../../Helpers/emailValidator';
import {useAuth} from '../../context/providers/AuthContextProvider';
import {useFocusEffect} from '@react-navigation/native';

const ResetPassword = () => {
  const {resetPassword} = useAuth();
  const [email, setEmail] = useState({value: '', error: ''});
  const [message, setMessage] = useState('');

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({...email, error: emailError});
    } else {
      resetPassword(email.value).then((res) => {
        setMessage(res);
      });
    }
    // redirect to sign in screen screen
  };

  useFocusEffect(
    React.useCallback(() => {
      setEmail({value: '', error: ''});
      return () => {};
    }, []),
  );

  return (
    <AuthScreen title="Reset Your Password">
      <TextInput
        placeholder="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(val: any) => setEmail({value: val, error: ''})}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description={message}
      />
      <Button
        onPress={sendResetPasswordEmail} title="Send"/>
    </AuthScreen>
  );
}

export default ResetPassword;