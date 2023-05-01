import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import AnimationJson from '../../assets/animations/Error-Robot.json'
import { useUIController, setIsError } from '../../context/UIContext';

const ErrorAnimation = (): JSX.Element => {
    const [controller, dispatch] = useUIController()
    const { isError } = controller;

    useEffect(() => {
        if(isError){
            setTimeout(() => {
                setIsError(dispatch, false);
            }, 2000)
        }
    }, [isError])

    return (
        <>
            {
                isError ? <View style={style.container}>
                    <LottieView
                        source={AnimationJson}
                        autoPlay
                        loop
                        speed={1}
                        resizeMode="cover"
                        style={{
                            width: 380,
                            height: 380,
                            backgroundColor: 'transparent',
                        }}
                    />
                </View> : null
            }
        </>
    );
};

export default ErrorAnimation;

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00000044',
        flex: 1,
        position: 'absolute',
        zIndex: 2,
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})