import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Header} from '@rneui/themed';
import React from 'react';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity} from 'react-native';
import ResetPassword from '../screens/Authentification/ResetPassword';
import SignIn from '../screens/Authentification/SignIn';
import SignUp from '../screens/Authentification/SignUp';
import { theme } from '../constants/theme';
const AuthStack = createNativeStackNavigator();

function AuthNavigator({navigation}: any): JSX.Element {
  return (
    <AuthStack.Navigator
      initialRouteName="signIn"
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: true,
        header: () => (
          <Header
            leftComponent={
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={18}/>
              </TouchableOpacity>
            }
            centerComponent={
              <Text
                style={{
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Fitness App
              </Text>
            }
            
            containerStyle={{
              backgroundColor: theme.colors.inversePrimary,
              top: 8,
            }}
          />
        ),
      }}>
      <AuthStack.Screen name="signIn" component={SignIn} />
      <AuthStack.Screen name="signUp" component={SignUp} />
      <AuthStack.Screen name="resetPassword" component={ResetPassword} />
    </AuthStack.Navigator>
  );
}
export default AuthNavigator;
