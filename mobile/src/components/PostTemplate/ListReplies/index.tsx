import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Reply from './Reply';

const ListReplies = ({ replies }: any) => {
    const renderReply = ({ item }: any) => (
        <Reply username={item.username}
            text={item.text}
            image={item.image} />
    )

    const keyExtractor = (item: any) => item.id.toString();

    return (
        <View style={styles.container}>
            <FlatList
                data={replies}
                renderItem={renderReply}
                keyExtractor={keyExtractor}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        marginStart: 45,
    }
});

export default ListReplies;
