import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CheckCode from './CheckCode';
import ResetPassword from './ResetPassword';
import SendResetEmail from './SendResetEmail';
import SignIn from './SignIn';
import SignUp from './SignUp';
const AuthStack = createNativeStackNavigator();

function Authentification(): JSX.Element {
  return (
    <AuthStack.Navigator initialRouteName="checkCode">
      <AuthStack.Screen name="signIn" component={SignIn} />
      <AuthStack.Screen name="signUp" component={SignUp} />
      <AuthStack.Screen name="resetPassword" component={ResetPassword} />
      <AuthStack.Screen name="checkCode" component={CheckCode} />
      <AuthStack.Screen name="sendResetEmail" component={SendResetEmail} />
    </AuthStack.Navigator>
  )
}
export default Authentification;
