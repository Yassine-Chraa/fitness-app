import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import AnimationJson from '../../assets/animations/loading.json'
import { useUIController, setLoadAnimation } from '../../context/UIContext';

const LoadingAnimation = (): JSX.Element => {
    const [controller, dispatch] = useUIController()
    const { isLoading } = controller;

    return (
        <>
            {
                isLoading ? <View style={style.container}>
                    <LottieView
                        source={AnimationJson}
                        autoPlay
                        loop
                        speed={1.5}
                        resizeMode="cover"
                        style={{
                            width: 280,
                            height: 280,
                            backgroundColor: 'transparent',
                        }}
                    />
                </View> : null
            }
        </>
    );
};

export default LoadingAnimation;

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00000099',
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