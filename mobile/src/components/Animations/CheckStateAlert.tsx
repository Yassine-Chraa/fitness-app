import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import SuccessAnimation from '../../assets/animations/CheckMark.json'
import FailureAnimation from '../../assets/animations/faileare-check.json'
import { useUIController, setIsCheckStateOk } from '../../context/UIContext';

const CheckStateAlert = (): JSX.Element => {
    const [controller, dispatch] = useUIController()

    const { checkState } = controller;

    useEffect(() => {
        if (checkState.isCheck) {
            setTimeout(() => {
                setIsCheckStateOk(dispatch,
                    {
                        isCheck: false,
                        isSuccess: true,
                        message: ""
                    });
            }, 3000)
        }
    }, [checkState])

    return (
        <>
            {
                checkState.isCheck ?
                    <View style={style.container}>
                        <LottieView
                            source={checkState.isSuccess ?
                                SuccessAnimation : FailureAnimation
                            }
                            autoPlay
                            loop={false}
                            speed={1}
                            resizeMode={checkState.isSuccess ?
                                "center" : "contain"
                            }
                            style={{
                                width: 180,
                                height: 180,
                                backgroundColor: 'transparent',
                            }}
                        />
                        <View style={{
                            ...style.messageContainer,
                            borderColor: checkState.isSuccess ? '#05ff07' : 'red'
                        }}>
                            <Text style={{
                                ...style.message,
                                color: checkState.isSuccess ? '#05ff07' : 'red'
                            }}>
                                {checkState.message}
                            </Text>
                        </View>
                    </View> : null
            }
        </>
    );
};

export default CheckStateAlert;

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
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageContainer: {
        padding: 13,
        marginHorizontal: 34,
        borderRadius: 14,
        borderWidth: 2,
        backgroundColor: "#201D0469",
    },
    message: {
        fontWeight: '800',
        fontFamily: "sans-serif",
        fontSize: 24,
        textAlign: 'center',
    }
})