import 'react-native-gesture-handler';
import {StatusBar, useColorScheme, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import APIHandlerProvider from './src/context/APIHandlerProvider';
import MainNavigator from './src/navigators/MainNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import theme from './src/constants/theme'

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : theme.colors.statusBar,
  };
  return (
    <APIHandlerProvider>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer theme={theme}>
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </APIHandlerProvider>
  );
}

export default App;
