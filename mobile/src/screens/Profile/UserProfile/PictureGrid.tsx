import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const PictureGrid = (): JSX.Element => {
    return (
        <View style={styles.viewAllContainer}>
            <TouchableOpacity activeOpacity={0.7} style={styles.viewAll} >
                <Text style={{ fontWeight: '900', fontSize: 15 }}>View All {">"}</Text>
            </TouchableOpacity>
            <View>
                <TouchableOpacity style={styles.button} activeOpacity={0.7}>
                    <Icon size={24} name="user" color={'white'} solid />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    viewAll: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 8
    },
    viewAllContainer: {
        marginTop: 10
    },
    button:{
        width: 40,
        height: 40,
        backgroundColor: '#111',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    }
});

export default PictureGrid;
