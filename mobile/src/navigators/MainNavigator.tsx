import AsyncStorage from '@react-native-async-storage/async-storage';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useAuth } from '../context/providers/AuthContextProvider';
import ResetPassword from '../screens/Authentification/ResetPassword';
import SignIn from '../screens/Authentification/SignIn';
import SignUp from '../screens/Authentification/SignUp';
import TabNavigator from './TabNavigator';
import MuscleExercices from '../screens/Exercices/MuscleExercices';
import WorkoutDetails from '../screens/Workout/WorkoutDetails';
import ExerciceDetails from '../screens/Exercices/ExerciceDetails';
import AllExercices from '../screens/Exercices/AllExercices';
import EditWorkout from '../screens/Workout/EditWorkout';
import ProgramDetails from '../screens/Workout/ProgramDetails';
import ProductDetails from '../screens/Store/ProductDetails';
import FoodDetails from '../screens/Food/FoodDetails';
import MyCart from '../screens/Store/MyCart';
import Coaches from '../screens/Profile/Coaches';
import CoachProfile from '../screens/Profile/CoachProfile';
import GymLocation from '../screens/Profile/GymLocation';
import EditProfile from '../screens/Profile/EditProfile';
import SplashScreen from 'react-native-splash-screen';
import axios from '../Helpers/axiosConfig'
import DailyNutrition from '../screens/Food/DailyNutrition';
import Settings from '../screens/Profile/Settings';
import ManageWorkOutReminder from '../components/profile/Settings/ManageWorkoutReminder';

enableScreens();
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const {currentUser, updateState } = useAuth();
  useEffect(() => {
    updateState().then(() => {
      SplashScreen.hide();
    })
  }, [SplashScreen]);
  useEffect(()=>{
    axios.defaults.headers.common[
      "authorization"
    ] = `Bearer ${currentUser?.token}`;
  })
  return (
    <Stack.Navigator
      initialRouteName={currentUser ? 'Auth' : 'Tab'}
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}>
      {currentUser ? (
        <>
          <Stack.Screen name="Tab" component={TabNavigator} />
          <Stack.Screen name="MuscleExercices" component={MuscleExercices} />
          <Stack.Screen name="AllExercices" component={AllExercices} />
          <Stack.Screen name="ExerciceDetails" component={ExerciceDetails} />
          <Stack.Screen name="WorkoutDetails" component={WorkoutDetails} />
          <Stack.Screen name="ProgramDetails" component={ProgramDetails} />
          <Stack.Screen name="EditWorkout" component={EditWorkout} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="FoodDetails" component={FoodDetails} />
          <Stack.Screen name="DailyNutrition" component={DailyNutrition} />
          <Stack.Screen name="MyCart" component={MyCart} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Coaches" component={Coaches} />
          <Stack.Screen name="CoachProfile" component={CoachProfile} />
          <Stack.Screen name="GymLocation" component={GymLocation} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="ManageWorkOutReminder" component={ManageWorkOutReminder} />
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
