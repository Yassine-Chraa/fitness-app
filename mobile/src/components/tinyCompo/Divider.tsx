import React from 'react';
import { StyleSheet, View } from 'react-native';

const Devider = (): any => {
    return (
        <View style={styles.devider}>
            <View style={styles.content}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    devider: {
        width: '100%',
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
        backgroundColor: '#3335',
        width: '100%',
        height: 2,
        borderRadius: 1
    }
});

export default Devider;
