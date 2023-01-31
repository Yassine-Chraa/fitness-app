import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../context/providers/AuthContextProvider';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createNativeStackNavigator();
const MainNavigator = (): JSX.Element => {
  const {updateState} = useAuth();
  updateState();
  const {isLogged} = useAuth();
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}>
      {isLogged ? (
        <Stack.Screen name="App" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};
export default MainNavigator;
