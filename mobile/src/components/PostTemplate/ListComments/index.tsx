import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Comment from './Comment';

const ListComments = ({ comments }: any): JSX.Element => {

    const renderComment = (comment: any) => (
        <Comment
            comment_id={comment.id}
            image={comment.user.img_url}
            username={comment.user.name}
            text={comment.content}
            key={Math.random()*(isNaN(parseInt(comment.id)) ? 100 : comment.id)}
        />
    );

    comments.map((comment: any) => console.log("|==> " + comment.image))

    return (
        <View style={style.ListComments}>
            <ScrollView>
                {comments && comments.length > 0 ? comments.map((comment: any) => renderComment(comment)) : null}
            </ScrollView>
        </View>
    );
};

export default ListComments;

const style = StyleSheet.create({
    ListComments: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingHorizontal: 8,
    }
})
