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
function App(): JSX.Element {
  const slides = [
    {
      key: 1,
      title: 'Transform your body',
      text: '',
      image: require('./src/assets/images/intro1.png'),
      bg: '#5B8FB9',
    },
    {
      key: 2,
      title: 'Achieve your fitness goals',
      text: '',
      image: require('./src/assets/images/intro2.png'),
      bg: '#BFDB38',
    },
    {
      key: 3,
      title: 'Get expert guidance',
      text: '',
      image: require('./src/assets/images/intro1.png'),
      bg: '#00425A',
    },
    {
      key: 4,
      title: 'Create your account and get started',
      text: '',
      image: require('./src/assets/images/intro1.png'),
      bg: '#301E67',
    },
  ];
  const [showRealApp, setShowRealApp] = useState(false);
  const renderItem = ({item}: any) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="arrow-right" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="check" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

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
