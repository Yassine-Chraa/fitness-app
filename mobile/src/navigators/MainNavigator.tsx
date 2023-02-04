import AsyncStorage from '@react-native-async-storage/async-storage';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {useAuth} from '../context/providers/AuthContextProvider';
import ResetPassword from '../screens/Authentification/ResetPassword';
import SignIn from '../screens/Authentification/SignIn';
import SignUp from '../screens/Authentification/SignUp';
import TabNavigator from './TabNavigator';
import MuscleExercices from '../screens/Exercices/MuscleExercices';
import WorkoutDetails from '../screens/WorkoutDetails';
import ExerciceDetails from '../screens/Exercices/ExerciceDetails';

enableScreens();
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const {isLogged, updateState} = useAuth();
  useEffect(() => {
    updateState();
  }, [AsyncStorage.getItem('isLogged')]);
  return (
    <Stack.Navigator
      initialRouteName={isLogged ? 'Auth' : 'Tab'}
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}>
      {isLogged ? (
        <>
          <Stack.Screen name="Tab" component={TabNavigator} />
          <Stack.Screen name="MuscleExercices" component={MuscleExercices} />
          <Stack.Screen name="ExerciceDetails" component={ExerciceDetails} />
          <Stack.Screen name="WorkoutDetails" component={WorkoutDetails} />
        </>
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
