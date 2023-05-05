import React, { useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Screen from '../../Screen';

const AchievmentsGallery = ({route}:any) => {
    const {badgets} = route.params;
    const batchSize = 4;

    const renderImage = ({ item, index }: any) => (
        <View style={{
            ...styles.imageContainer,
            flex: index >= Math.floor(badgets.length / batchSize) * batchSize ? 0 : 1,
        }}>
            <Image style={styles.image} source={item.image} />
            <Text style={styles.text}>{item.title}</Text>
        </View>
    );

    return (
        <Screen name={"Achievments"} backButton>
            <View style={styles.container}>
                <FlatList
                    data={badgets}
                    renderItem={renderImage}
                    keyExtractor={item => item.toString()+(Math.random()*2000)}
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
        backgroundColor: 'gray',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'center',
        backgroundColor: 'gray',
        margin: 4
    },
    text:{
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        margin:5,
    }
});

export default AchievmentsGallery;