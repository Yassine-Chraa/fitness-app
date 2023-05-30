import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
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
import axios from '../Helpers/axiosConfig';
import DailyNutrition from '../screens/Food/DailyNutrition';
import Settings from '../screens/Profile/Settings';
import ManageWorkOutReminder from '../components/profile/Settings/ManageWorkoutReminder';
import FeedBack from '../screens/Profile/FeedBack';
import LoadingAnimation from '../components/Animations/LoadingAnimation';
import ErrorAnimation from '../components/Animations/ErrorAnimation';
import CheckStateAlert from '../components/Animations/CheckStateAlert';
import MyProgramsDetails from '../screens/Workout/MyProgramsDetails';
import ViewProfile from '../components/profile/ViewProfile';
import ImageGallery from '../components/profile/ViewProfile/ImageGallery';
import ImageSwipper from '../components/profile/ViewProfile/ImageSwipper';
import AchievmentsGallery from '../components/profile/ViewProfile/AchievmentsGallery';
import CoachClients from '../screens/Profile/CoachClients';
import ChangePassword from '../components/profile/Settings/PrivacySettings/ChangePassword';
import VerifyEmail from '../components/profile/Settings/PrivacySettings/VerifyEmail';
import VerifyPassword from '../components/profile/Settings/PrivacySettings/VerifyPassword';
import ResetPasswordForUpdate from '../components/profile/Settings/PrivacySettings/ResetPasswordForUpdate';

import Toast from 'react-native-toast-message';
import Notifications from '../components/profile/Notifications';
enableScreens();
const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { currentUser, updateState } = useAuth();

  useEffect(() => {
    if (SplashScreen && currentUser == null) {
      updateState().then(() => {
        SplashScreen.hide();
      })
    } else {
      axios.defaults.headers.common["authorization"] = `Bearer ${currentUser?.token}`;
    }

  }, [SplashScreen, currentUser]);
  return (
    <>
      {/* Animation and alerts here */}
      <LoadingAnimation />
      <CheckStateAlert />
      <ErrorAnimation />
      {/* <Notifications/> */}
      {/* ------------------------ */}

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
            <Stack.Screen name="MyProgramsDetails" component={MyProgramsDetails} />
            <Stack.Screen name="EditWorkout" component={EditWorkout} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="FoodDetails" component={FoodDetails} />
            <Stack.Screen name="DailyNutrition" component={DailyNutrition} />
            <Stack.Screen name="MyCart" component={MyCart} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ViewProfile" component={ViewProfile} />
            <Stack.Screen name="Coaches" component={Coaches} />
            <Stack.Screen name="CoachClients" component={CoachClients} />
            <Stack.Screen name="CoachProfile" component={CoachProfile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="ManageWorkOutReminder" component={ManageWorkOutReminder} />
            <Stack.Screen name="FeedBack" component={FeedBack} />
            <Stack.Screen name="ImageGallery" component={ImageGallery} />
            <Stack.Screen name="ImageSwipper" component={ImageSwipper} />
            <Stack.Screen name="AchievmentsGallery" component={AchievmentsGallery} />

            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
            <Stack.Screen name="VerifyPassword" component={VerifyPassword} />
            <Stack.Screen name="ResetPasswordForUpdate" component={ResetPasswordForUpdate} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </>
  );
};
export default MainNavigator;
