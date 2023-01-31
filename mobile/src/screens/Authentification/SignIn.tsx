import {Image} from '@rneui/base';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAuth} from '../../context/providers/AuthContextProvider';
import {theme} from '../../constants/theme';
import {emailValidator} from '../../Helpers/emailValidator';
import {passwordValidator} from '../../Helpers/passwordValidator';
import SignInObj from '../../types/SignInObj';
import AuthScreen from './components/AuthScreen';
import Button from './components/Button';
import TextInput from './components/TextInput';

const SignIn = ({navigation}: any) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const {signIn} = useAuth();

  const onSignInPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    setEmail({...email, error: emailError});
    setPassword({...password, error: passwordError});

    if (emailError == '' && passwordError == '') {
      const sentData: SignInObj = {
        email: email.value,
        password: password.value,
      };
      const signInResult = await signIn(sentData);
      console.log(signInResult);
      switch (signInResult) {
        case '_STORAGE_ERROR_':
          Alert.alert('ERROR', 'Ooops! something went wrong !', [
            {text: 'Close', onPress: () => console.log('')},
          ]);
          break;
        case '_FAILURE_':
          Alert.alert('ERROR', 'Ooops! password or email is not correct !', [
            {text: 'Close', onPress: () => console.log('')},
          ]);
          break;
        case '_SUCCESS_':
          break;
        default:
        // redirect to main page
      }
    }
  };

  return (
    <AuthScreen title="Welcome Back To FitnessApp">
      <TextInput
        placeholder="Email"
        value={email.value}
        onChangeText={(val: string) => setEmail({value: val, error: ''})}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password.value}
        onChangeText={(val: string) => setPassword({value: val, error: ''})}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={() => navigation.navigate('resetPassword')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button onPress={onSignInPressed} title="Sign In"/>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
          <Text style={styles.link}>Sign up</Text>
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
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
});
export default SignIn;