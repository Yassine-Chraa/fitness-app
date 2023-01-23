import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductContextProvider} from './src/Context/ProductContext';
import Authentification from './src/screens/Authentification';
import BottomNavigation from './src/navigation/BottomNavigation';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <ProductContextProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={BottomNavigation} />
          <Stack.Screen name="Auth" component={Authentification} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductContextProvider>
  );
}

export default App;
