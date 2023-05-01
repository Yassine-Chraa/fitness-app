import 'react-native-gesture-handler';
import { StatusBar, useColorScheme, Platform, UIManager } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import APIHandlerProvider from './src/context/APIHandlerProvider';
import MainNavigator from './src/navigators/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import theme from './src/constants/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UIControllerProvider } from './src/context/UIContext';

function App() {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : theme.colors.statusBar,
  };
  return (
    <UIControllerProvider>
      <APIHandlerProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={backgroundStyle.backgroundColor}
            />
            <NavigationContainer theme={theme}>
              <MainNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </APIHandlerProvider>
    </UIControllerProvider>
  );
}

export default App;
