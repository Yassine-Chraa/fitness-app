import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export const Component1 = () => (
    <View style={{...styles.card, borderBottomLeftRadius:8, borderTopLeftRadius:8}}>
        <Text style={styles.data}>150</Text>
        <Text style={styles.title}>weight LBS</Text>
    </View >);
export const Component2 = () => (
    <View style={{...styles.card, marginHorizontal:4}}>
        <Text style={styles.data}>0.0</Text>
        <Text style={styles.title}>Body fat %</Text>
    </View>);
export const Component3 = () => (
    <View style={{...styles.card, borderBottomRightRadius:8, borderTopRightRadius:8}}>
        <Text style={styles.data}>22.14</Text>
        <Text style={styles.title}>BMI</Text>
    </View>);

const InfoGroup = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Component1 />
            <Component2 />
            <Component3 />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        paddingVertical:8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#111',
        flex: 1
    },
    data: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700'
    },
    title: {
        color: '#ddd',
        fontSize: 14,
        fontWeight: '400'
    }
});

export default InfoGroup;
