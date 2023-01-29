import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { theme } from '../../core/theme';
import { emailValidator } from '../../Helpers/emailValidator';
import { passwordValidator } from '../../Helpers/passwordValidator';
import SignInObj from '../../types/SignInObj';
import BackButton from './components/BackButton';
import Background from './components/Background';
import Button from './components/Button';
import Header from './components/Header';
import TextInput from './components/InputText';
import Logo from './components/Logo';
import storeData from '../../Helpers/Storage/storeData';


export default function SignIn({ navigation }: any) {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const { signIn } = useAuth();

  const onSignInPressed = async () => {

    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    setEmail({ ...email, error: emailError })
    setPassword({ ...password, error: passwordError })

    if (emailError == '' && passwordError == '') {
      const sentData: SignInObj = { email: email.value, password: password.value };
      const signInResult = await signIn(sentData);
      switch (signInResult) {
        case "_STORAGE_ERROR_":
          Alert.alert('ERROR', "Ooops! something went wrong !", [
            { text: 'Close', onPress: () => console.log('') },
          ]);
          break
        case "_FAILURE_":
          Alert.alert('ERROR', "Ooops! password or email is not correct !", [
            { text: 'Close', onPress: () => console.log('') },
          ]);
          break
        default:
        // redirect to main page
      }
    }
  }

  return (
    <Background>
      <BackButton />
      <Logo />
      <Header>Welcome Back To FitnessApp</Header>
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate("resetPassword", null)}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onSignInPressed}>
        SignIn
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("signUp", null)}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
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
})

