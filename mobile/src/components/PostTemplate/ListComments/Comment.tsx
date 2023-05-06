import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ListReplies from '../ListReplies';
import Icon from 'react-native-vector-icons/FontAwesome5';
import InputReply from '../ListReplies/InputReply';
import { useReply } from '../../../context/providers/ReplyContextProvider';
import ReplyType from '../../../types/ReplyType';

const Comment = ({ username, text, image, comment_id, user_id }: any): JSX.Element => {
    const [showReplies, setShowReplies] = useState(false);
    const [liked, setLiked] = useState(false);
    const [showNewReplyInput, setShowNewReplyInput] = useState(false);
    const [replies, setReplies] = useState<any>();
    const { getReplysByCommentId } = useReply();
    const {addReply} = useReply();

    const toggleLike = () => {
        setLiked(!liked);
    };

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    const sendReplyHandler = async (text: any) => {
        const reply: ReplyType = {
            content: text,
            comment_id: comment_id,
            user_id: user_id,
        }
        const result = await addReply(reply);
        if(result){
            setShowNewReplyInput(() => false)
            loadReplies();
        }
    }

    const addNewReplyHandler = () => {
        setShowNewReplyInput((prev: any) => !prev)
    }

    const loadReplies = async () => {
        const replies = await getReplysByCommentId(comment_id);
        if (replies) {
            setReplies(() => replies);
        }
    }

    useEffect(() => {
        loadReplies();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.commentContainer}>
                <Image style={styles.commentImage} source={{ uri: image }} />
                <View style={styles.commentContent}>
                    <View style={styles.commentNameText}>
                        <Text style={styles.commentUsername}>{username}</Text>
                        <Text style={styles.commentText}>{text}</Text>
                    </View>
                    <View style={styles.commentBtnContainer}>
                        <TouchableOpacity activeOpacity={0.7} style={styles.commentBtn}
                            onPress={toggleLike}>
                            <Text>
                                <Icon name={'thumbs-up'} size={14} color={liked ? 'blue' : 'gray'} />
                            </Text>
                        </TouchableOpacity>
                        <Text>|</Text>
                        <TouchableOpacity activeOpacity={0.7} style={styles.commentBtn}
                            onPress={addNewReplyHandler}>
                            <Text>
                                <Icon name={'reply'} size={14} color={'gray'} />
                            </Text>
                        </TouchableOpacity>
                        <Text>|</Text>
                        {replies && replies.length > 0 ? (
                            <TouchableOpacity style={styles.commentBtn} onPress={toggleReplies}>
                                <Text style={styles.showRepliesText}>
                                    {showReplies ? 'Hide Replies' : `View ${replies.length} Replies`}
                                </Text>
                            </TouchableOpacity>
                        ):<Text style={styles.noReplies}>0 reply</Text>}
                    </View>
                </View>
            </View>
            {showNewReplyInput && (
                <InputReply sendReplyHandler={sendReplyHandler} />
            )}
            {showReplies && replies && replies.length > 0 && (
                <ListReplies replies={replies} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    commentContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 0,
    },
    commentImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    commentNameText: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 8,
        borderTopEndRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    commentUsername: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#22a',
        marginBottom: 5,
    },
    commentText: {
        fontSize: 15,
    },
    showRepliesButton: {
        backgroundColor: '#f2f2f2',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    showRepliesText: {
        color: '#666',
    },
    commentBtnContainer: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 3,
    },
    commentBtn: {
        margin: 5,
        padding: 5,
    },
    noReplies:{
        color: 'gray',
        marginLeft: 5,
    }
});

export default Comment;
