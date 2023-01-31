import { useState, useEffect } from 'react';
import {
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import APIHandlerProvider from './src/context/APIHandlerProvider';
import MainNavigator from './src/navigators/MainNavigator';
import IntroSlider from './src/screens/IntroSlider';
import getData from './src/Helpers/Storage/getData';

const Stack = createNativeStackNavigator();


const App = (): JSX.Element => {
  const [isShowRealApp, setIsShowRealApp] = useState(false);
  const [isIntroDone, setIsIntroDone] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const isFirstTime = async () => {
      const res = await getData('is_intro_done');
      setIsIntroDone(res)
    }
    isFirstTime();
  }, [])


  return (
    <>
      {isShowRealApp || isIntroDone ?
        <APIHandlerProvider APIHandlerProvider >
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </APIHandlerProvider >
        : <IntroSlider setIsShowRealApp={setIsShowRealApp} />
      }
    </>
  )
}

export default App;
