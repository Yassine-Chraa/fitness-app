import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Item = (): JSX.Element => {
    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.itemContainer}>
            <View style={styles.imgAndName}>
                <Image style={styles.image} source={require('../../../assets/images/gym.jpg')} />
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>Ben alla Ismail</Text>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.moreInfo}>property-1</Text>
                        <Text style={{ ...styles.moreInfo, marginStart: 5 }}>property-1</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
                <Icon name={'chevron-right'} size={14} solid color={'black'} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default Item;

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#222',
    },
    imgAndName: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eee',
    },
    image: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    textContainer: {
        marginLeft: 16,
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    moreInfo: {
        fontSize: 13,
        color: '#eee',
        borderWidth: 1,
        borderColor: '#000',
        textAlign: 'center',
        borderRadius: 6,
        backgroundColor: '#333',
        paddingHorizontal: 7,
        paddingVertical: 2,
    },
});
