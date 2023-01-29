import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ResetPassword from './ResetPassword';
import SignIn from './SignIn';
import SignUp from './SignUp';
const AuthStack = createNativeStackNavigator();

function Authentification(): JSX.Element {
  return (
    <AuthStack.Navigator initialRouteName="signIn">
      <AuthStack.Screen name="signIn" component={SignIn} />
      <AuthStack.Screen name="signUp" component={SignUp} />
      <AuthStack.Screen name="resetPassword" component={ResetPassword} />
    </AuthStack.Navigator>
  )
}
export default Authentification;
