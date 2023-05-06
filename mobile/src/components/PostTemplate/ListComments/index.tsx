import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Comment from './Comment';

const ListComments = ({ comments }: any): JSX.Element => {

    


    const renderComment = ({ item }: any) => (
        <Comment
            image={item.image}
            username={item.username}
            text={item.text}
            replies={item.replies}
        />
    );

    return (
        <View style={style.ListComments}>
            <FlatList
                data={comments}
                renderItem={renderComment}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default ListComments;

const style = StyleSheet.create({
    ListComments:{
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal:8,
    }
})
