import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {useAuth} from '../context/providers/AuthContextProvider';
import ResetPassword from '../screens/Authentification/ResetPassword';
import SignIn from '../screens/Authentification/SignIn';
import SignUp from '../screens/Authentification/SignUp';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();
const MainNavigator = (): JSX.Element => {
  const {isLogged, updateState} = useAuth();
  updateState();
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}>
      {isLogged ? (
        <Stack.Screen name="Tab" component={TabNavigator} />
      ) : (
        <>
          <Stack.Screen name="signIn" component={SignIn} />
          <Stack.Screen name="signUp" component={SignUp} />
          <Stack.Screen name="resetPassword" component={ResetPassword} />
        </>
      )}
    </Stack.Navigator>
  );
};
export default MainNavigator;
