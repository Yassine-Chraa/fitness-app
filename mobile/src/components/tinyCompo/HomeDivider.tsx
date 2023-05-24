import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeDivider = ({ title }: any): JSX.Element => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.title}>{title}</Text>
            <View style={styles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 14,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#0006',
    },
    title: {
        marginHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#555555',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});

export default HomeDivider;
