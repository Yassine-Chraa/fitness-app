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

                        <View style={{
                            ...style.alertContainer,
                            borderColor: checkState.isSuccess ? '#05ff07' : 'red'
                        }}>
                            <View style={style.messageContainer}>
                                <Text style={{
                                    ...style.message,
                                }}>
                                    {checkState.message}
                                </Text>
                            </View>

                            <View style={style.animationContainer}>
                                <LottieView
                                    source={checkState.isSuccess ?
                                        SuccessAnimation : FailureAnimation
                                    }
                                    autoPlay={true}
                                    autoSize={true}
                                    loop={false}
                                    speed={0.77}
                                    resizeMode={checkState.isSuccess ?
                                        "contain" : "contain"
                                    }
                                    style={checkState.isSuccess ? style.animationSuccess : style.animationFailure}
                                />
                            </View>
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
        flex: 1,
        position: 'absolute',
        zIndex: 12,
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    alertContainer: {
        padding: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderLeftWidth: 10,
        width: '100%',
        backgroundColor: '#000d',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    animationContainer: {
        flex: 1,
        width: '25%', height: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    message: {
        fontWeight: '800',
        fontFamily: "sans-serif",
        color: '#eee',
        fontSize: 14,
        textAlign: 'center',
        textTransform: 'capitalize'
    },
    messageContainer: {
        marginRight: 12,
        width: '75%',
    },
    animationSuccess: {
        width: 180,
        height: 180,
        backgroundColor: 'transparent',
    },
    animationFailure: {
        width: 90,
        height: 90,
        backgroundColor: 'transparent',
    }
})