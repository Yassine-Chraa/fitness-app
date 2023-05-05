import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Image, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProgressSwipper = ({ images, imageStyle, title }: any): JSX.Element => {
    const navigation: any = useNavigation();

    return (
        <View style={styles.littleSwipperContainer}>
            <TouchableOpacity activeOpacity={0.5}
                style={styles.littleSwipperHeader}
                onPress={() => navigation.navigate('ImageGallery', { images: images })} >
                <Text>{title}</Text>
                <Icon name={'chevron-right'} size={14} />
            </TouchableOpacity>

            <ScrollView horizontal={true} contentContainerStyle={styles.swipper}>
                {images.map((image: any, index: any) => {
                    return (
                        <TouchableOpacity activeOpacity={0.6} key={index}
                            onPress={() => navigation.navigate("ImageSwipper", { images: images, index: index })}>
                            <Image source={image} style={{ ...styles.ScrollImage, ...imageStyle }} />
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default ProgressSwipper;

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