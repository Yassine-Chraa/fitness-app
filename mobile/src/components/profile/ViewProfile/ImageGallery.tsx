import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Screen from '../../Screen';
import { useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/themed';

const ImageGallery = ({ route }: any) => {
    const navigation: any = useNavigation();
    const { images } = route.params;
    const batchSize = 4;
    const renderImage = ({ item, index }: any) => {
        return (

            <TouchableOpacity style={{
                ...styles.imageContainer,
                flex: index >= Math.floor(images.length / batchSize) * batchSize ? 0 : 1,
            }}
                onPress={() => navigation.navigate("ImageSwipper", { images: images, index: index })}>
                <Image style={styles.image} source={{ uri: item?.img_url }} />
            </TouchableOpacity>
        )
    };


    return (
        <Screen name={"Profile"} backButton>
            <View style={styles.container}>
                <FlatList
                    data={images}
                    renderItem={renderImage}
                    keyExtractor={item => item.toString() + (Math.random() * 2000)}
                    numColumns={4}
                    style={{ width: '100%', height: '100%', flex: 1 }}
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: 84,
        height: 84,
        resizeMode: 'cover',
    },
});

export default ImageGallery;