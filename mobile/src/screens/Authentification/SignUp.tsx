import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert, Text } from 'react-native';
import AuthScreen from '../../components/authentification/AuthScreen';
import Button from '../../components/authentification/Button';
import CustomTextInput from '../../components/authentification/CustomTextInput';
import theme from '../../constants/theme';
import {emailValidator} from '../../Helpers/emailValidator';
import {passwordValidator} from '../../Helpers/passwordValidator';
import {nameValidator} from '../../Helpers/nameValidator';
import SignUpObj from '../../types/SignUpObj';
import { passwordConfirmValidator } from '../../Helpers/passwordConfirmValidator';
import { useAuth } from '../../context/providers/AuthContextProvider';


const SignUp = ({navigation}:any) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [password_confirmation, setPasswordConfirmation] = useState({
    value: '',
    error: '',
  });
  const { signUp } = useAuth();

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const passwordConfirmationError = passwordConfirmValidator(
      password.value,
      password_confirmation.value,
    );
    setName(prev => ({ ...prev, error: nameError }));
    setEmail(prev => ({ ...prev, error: emailError }));
    setPassword(prev => ({ ...prev, error: passwordError }));
    setPasswordConfirmation(prev => ({
      ...prev,
      error: passwordConfirmationError,
    }));

    if (
      emailError == '' &&
      passwordError == '' &&
      nameError == '' &&
      passwordConfirmationError == ''
    ) {
      const signUpData: SignUpObj = {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      };

      const result = await signUp(signUpData);

      if (result) {
        navigation.navigate('SignIn');
      }else{
        setPassword(prev => ({ ...prev, error: "Email address already in use" }));
      }
    }
  };

  return (
    <AuthScreen title="Create Account">
      <CustomTextInput
        placeholder="Name"
        value={name.value}
        onChangeText={(val: string) => setName({ value: val, error: '' })}
        errorText={name.error}
      />
      <CustomTextInput
        placeholder="Email"
        value={email.value}
        onChangeText={(val: string) => setEmail({ value: val, error: '' })}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <CustomTextInput
        placeholder="Password"
        value={password.value}
        onChangeText={(val: string) => setPassword({ value: val, error: '' })}
        errorText={password.error}
        secureTextEntry
      />
      <CustomTextInput
        placeholder="Confirm Password"
        value={password_confirmation.value}
        onChangeText={(val: string) =>
          setPasswordConfirmation({ value: val, error: '' })
        }
        error={!!password_confirmation.error}
        errorText={password_confirmation.error}
        secureTextEntry
      />
      <Button
        title="Sign Up"
        mode="contained"
        onPress={() => onSignUpPressed()}
      />

      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.link}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </AuthScreen>
  );
};

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
export default SignUp;