import {useState, useEffect} from 'react';
import {
  StatusBar,
  useColorScheme,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import APIHandlerProvider from './src/context/APIHandlerProvider';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';

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
  const [introDone, setIntroDone] = useState(false);
  AsyncStorage.getItem('intro_done').then((res: string | null) => {
    if (res == 'true') setIntroDone(true);
    else setIntroDone(false);
  });
  if (showRealApp || introDone) {
    return (
      <APIHandlerProvider>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </APIHandlerProvider>
    );
  } else {
    return (
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        onDone={() => {
          setShowRealApp(true);
          AsyncStorage.setItem('intro_done', 'true');
        }}
      />
    );
  }
}
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  buttonCircle: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 32,
    paddingVertical: 8,
    borderRadius: 2,
  },
});
export default App;