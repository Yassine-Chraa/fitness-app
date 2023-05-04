import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Reply = ({ username, text, image }:any):JSX.Element => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.comment}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.text}>{text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 8,
        marginBottom: 10,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    comment: {
        flex: 1,
        flexDirection: 'column',
        borderTopEndRadius: 10,
        borderBottomEndRadius:10,
        borderBottomStartRadius: 10,
        backgroundColor: '#eee',
        padding: 6,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#222'
    },
    text: {
        marginTop: 4,
        fontSize: 12,
    },
});

export default Reply;
