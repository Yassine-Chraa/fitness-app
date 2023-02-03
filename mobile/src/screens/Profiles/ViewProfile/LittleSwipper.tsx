import React from 'react'
import { StyleSheet, Image, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const LittleSwipper = ({ images, imageStyle, title }: any): JSX.Element => {

    return (
        <View style={styles.littleSwipperContainer}>
            <TouchableOpacity activeOpacity={0.5} style={styles.littleSwipperHeader}>
                <Text>{title}</Text>
                <Icon name={'chevron-right'} size={14} />
            </TouchableOpacity>

            <ScrollView horizontal={true} contentContainerStyle={styles.swipper}>
                {images.map((image: any) => {
                    return (
                        <Image source={image} style={{ ...styles.ScrollImage, ...imageStyle }} />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default LittleSwipper;

const styles = StyleSheet.create({
    ScrollImage: {
        width: 70,
        height: 70,
        margin: 5,
    },
    littleSwipperContainer: {
        marginVertical: 10,
    },
    littleSwipperHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 8
    },
    swipper: {
        paddingVertical: 5,
    }
})