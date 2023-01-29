import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Authentification from './src/screens/Authentification';
import BottomNavigation from './src/navigation/TabNavigation';
import APIHandlerProvider from './src/context/APIHandlerProvider';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <APIHandlerProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="App">
          <Stack.Screen name="App" component={BottomNavigation} />
          <Stack.Screen name="Auth" component={Authentification} />
        </Stack.Navigator>
      </NavigationContainer>
    </APIHandlerProvider>
  );
}

export default App;
