import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const NewsButton = ({title, indicator}:any) => {
    return (
        <>
            <TouchableOpacity activeOpacity={0.8} style={styles.newsbutton}>
                <Text style={styles.firstText}>{title}</Text>
                <View style={styles.indication}>
                    <Text style={styles.secondText}>{indicator}</Text>
                    <Icon name={'chevron-right'} size={20} color={'white'} />
                </View>
            </TouchableOpacity>
        </>
    )
}

export default NewsButton;

const styles = StyleSheet.create({
    newsbutton: {
        backgroundColor: '#111',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        height: 44,
        paddingHorizontal: 5
    },
    indication: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    secondText: {
        color: 'red',
        fontSize: 15,
        fontWeight: '500',
        marginEnd: 14,
    },
    firstText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
    }
})
