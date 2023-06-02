import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const ImageSwipper = ({ route }:any) => {
    const {images, index} = route.params;
    return (
        <View style={styles.container}>
            <Swiper index={index} loop={false}>
                {images.map((image:any, i:any) => {
                    return (
                        <View style={styles.imageContainer} key={i}>
                            <Image style={styles.image} source={{ uri: image.img_url }} />
                        </View>
                    )
                })}
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default ImageSwipper;
