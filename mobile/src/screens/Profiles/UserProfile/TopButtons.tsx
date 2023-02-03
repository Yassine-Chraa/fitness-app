import { Image } from '@rneui/themed';
import React from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


export const Button = ({ MEnd = 0, MStart = 0 }: any): JSX.Element => {
    return (

        <TouchableOpacity activeOpacity={0.8} style={{ ...styles.CustomBtnContainer, marginEnd: MEnd, marginStart: MStart }} >
            <View>
                <Icon name={'user'} color={'white'} size={24} solid />
            </View>
            <Text style={{ color: 'white' }}>UpGrade</Text>
        </TouchableOpacity >

    )
}

function TopButtons(): JSX.Element {
    return (
        <View style={styles.buttonsContainer}>
            <Button MEnd={5} />
            <Button MStart={5} />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 20,
        height: 10,
    },
    buttonsContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    CustomBtnContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#222',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 6,
        flex: 1,
    }
});

export default TopButtons;