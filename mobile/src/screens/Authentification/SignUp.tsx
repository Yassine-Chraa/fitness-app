import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { Text } from 'react-native-paper';
import AuthScreen from './components/AuthScreen';
import Button from './components/Button';
import TextInput from './components/TextInput';
import { theme } from '../../constants/theme';
import { emailValidator } from '../../Helpers/emailValidator';
import { passwordValidator } from '../../Helpers/passwordValidator';
import { nameValidator } from '../../Helpers/nameValidator';
import SignUpObj from '../../types/SignUpObj';
import { passwordConfirmValidator } from '../../Helpers/passwordConfirmValidator';
import { useAuth } from '../../context/providers/AuthContextProvider';
import Logo from './components/Logo';
import Header from './components/Header';

export default function SignUp({ navigation }: any) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [password_confirmation, setPasswordConfirmation] = useState({
    value: '',
    error: '',
  });
  const { signUp } = useAuth();

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const passwordConfirmationError = passwordConfirmValidator(password.value, password_confirmation.value)
    setName((prev) => ({ ...prev, error: nameError }))
    setEmail((prev) => ({ ...prev, error: emailError }))
    setPassword((prev) => ({ ...prev, error: passwordError }))
    setPasswordConfirmation((prev) => ({ ...prev, error: passwordConfirmationError }))

    if (emailError == '' && passwordError == '' && nameError == '' && passwordConfirmationError == '') {
      const signUpData: SignUpObj = {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      };

      let signUpResult = await signUp(signUpData);

      switch (signUpResult) {
        case '_STORAGE_ERROR_':
          Alert.alert('ERROR', 'Ooops! something went wrong !', [
            { text: 'Close', onPress: () => console.log('') },
          ]);
          break;
        case '_FAILURE_':
          Alert.alert('ERROR', 'Ooops! something went wrong !', [
            { text: 'Close', onPress: () => console.log('') },
          ]);
          break;
        default:
          navigation.navigate("signIn", null)
          break
      }
    }
  };

  return (
    <AuthScreen title="Create Account">
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(val: string) => setName({ value: val, error: '' })}
        error={name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(val: string) => setEmail({ value: val, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(val: string) => setPassword({ value: val, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={password_confirmation.value}
        onChangeText={(val: string) =>
          setPasswordConfirmation({ value: val, error: '' })
        }
        error={!!password_confirmation.error}
        errorText={password_confirmation.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={() => onSignUpPressed()}
        style={{ marginTop: 24 }}>
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("signIn", null)}>
          <Text style={styles.link}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
});
