import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Reply from './Reply';

const ListReplies = ({ replies }: any) => {

    const renderReply = (reply: any) => (
        <Reply
            username={reply.user.name}
            text={reply.content}
            image={reply.user.profile}
            key={Math.random()*(isNaN(parseInt(reply.id)) ? 100 : reply.id)} />
    )

    return (
        <View style={styles.container}>
            <ScrollView>
                {replies && replies.length > 0 ? replies.map((reply: any) => renderReply(reply)) : null}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginStart: 45,
    }
});

export default ListReplies;
