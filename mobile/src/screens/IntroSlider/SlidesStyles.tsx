import { StyleSheet } from 'react-native';

export const slides = [
    {
        key: 1,
        title: 'Transform your body',
        text: '',
        //image: require('./src/assets/images/intro1.png'),
        bg: '#5B8FB9',
    },
    {
        key: 2,
        title: 'Achieve your fitness goals',
        text: '',
        //image: require('./src/assets/images/intro2.png'),
        bg: '#BFDB38',
    },
    {
        key: 3,
        title: 'Get expert guidance',
        text: '',
        //image: require('./src/assets/images/intro1.png'),
        bg: '#00425A',
    },
    {
        key: 4,
        title: 'Create your account and get started',
        text: '',
        //image: require('./src/assets/images/intro1.png'),
        bg: '#301E67',
    },
];

export const SlidesStyles = StyleSheet.create({
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