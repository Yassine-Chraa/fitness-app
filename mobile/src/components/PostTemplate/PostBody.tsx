import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FullImageView from '../FAImageHandlers/FullImageView';
import { useReaction } from '../../context/providers/ReactionContextProvider';
import ReactionType from '../../types/ReactionType';
import ListOfLikers from './ListOfLikers';
import moment from 'moment';

const PostBody = ({ nbrComments, setShowComments, showComments, setShowNewCommentInput, post }: any): JSX.Element => {
    const [modalVisible, setModalVisible] = useState(false);
    const [islike, setIsLike] = useState(false);
    const [nbr_likes, setNbr_likes] = useState<number | any>();
    const [nbr_comments, setNbr_comments] = useState();
    const [hasComment, setHasComment] = useState(false);
    const [timeOutId, setTimeOutId] = useState<number | any>();
    const [isLikersVisible, setIsLikersVisible] = useState(false);
    const { addReaction, deleteReactionByPostUserId, getReactionByPostUserId } = useReaction();

    const toggleReplies = () => {
        setShowComments((prev: any) => !prev);
    };

    const likeClickHandler = () => {
        console.log("(islike.before)====> " + islike)
        setIsLike((prev) => !prev)
        console.log("(islike.after)====> " + islike)
        clearTimeout(timeOutId);
        const newTimeOutId = setTimeout(() => {
            if (!islike) {
                addNewReaction();
            } else {
                deleteReaction();
            }
        }, 1000);
        setTimeOutId(() => newTimeOutId)
    }

    const addNewComment = () => {
        setShowNewCommentInput((prev: any) => !prev);
    }

    const handlePress = () => {
        setModalVisible(true);
    };

    const handleClose = () => {
        setModalVisible(false);
    };

    const addNewReaction = async () => {
        const reaction: ReactionType = {
            user_id: post.user.id,
            post_id: post.id,
        }
        const num = await addReaction(reaction);
        if (num) {
            console.log("[add]-------------> nbr_likes : " + num)
            setNbr_likes(() => num);
        }
    }

    const deleteReaction = async () => {
        const reaction: ReactionType = {
            user_id: post.user.id,
            post_id: post.id,
        }
        const num = await deleteReactionByPostUserId(reaction);
        if (num) {
            console.log("[delete]-------------> nbr_likes : " + num)
            setNbr_likes(() => num);
        }
    }

    const checkIsCurrentUserLoves = async () => {
        const reaction: ReactionType = {
            user_id: post.user.id,
            post_id: post.id,
        }
        const num = await getReactionByPostUserId(reaction);
        if (num) {
            setIsLike(() => true);
        } else (
            setIsLike(() => false)
        )
    }

    useEffect(() => {
        setNbr_likes(() => post.nbr_likes)
        setNbr_comments(() => post.nbr_comments)
        checkIsCurrentUserLoves()
    }, []);

    return (
        <View style={styles.postContainer}>

            {
                post && <ListOfLikers isLikersVisible={isLikersVisible}
                    setIsLikersVisible={setIsLikersVisible}
                    post_id={post.id} />
            }

            <View style={styles.postHeader}>
                <View style={styles.postHeaderImgName}>
                    <TouchableOpacity activeOpacity={0.6}>
                        <Image style={styles.postHeaderImage} source={{ uri: post.user.profile }} />
                    </TouchableOpacity>
                    <View style={styles.postHeaderTitle}>
                        <Text style={styles.postHeaderTitleName}>{post.user.name}</Text>
                        <Text style={styles.sinceTexxt}>{
                            moment(post.created_at).fromNow()
                        }</Text>
                    </View>
                </View>
            </View>
            <View style={styles.postBody}>
                <Text style={styles.postBodyText}>
                    {post.content}
                </Text>
                <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
                    <Image style={styles.postBodyImage} source={{ uri: post.image_url }} />
                </TouchableOpacity>

                {modalVisible && <FullImageView source={{ uri: post.image_url }} onClose={handleClose} />}
            </View>
            <View style={styles.postFooter}>
                <View style={styles.postBtns}>
                    <View style={styles.postFooterIcon}>
                        <TouchableOpacity activeOpacity={0.6}
                            onLongPress={() => setIsLikersVisible(() => true)}
                            onPress={likeClickHandler}>
                            <Icon name={'heart'} size={24} color={islike ? '#f00' : 'gray'}
                                style={{
                                    marginEnd: 6,
                                }} />
                        </TouchableOpacity>
                        <Text>{nbr_likes}</Text>
                    </View>
                    <View style={styles.postFooterIcon}>
                        <TouchableOpacity activeOpacity={0.6} onPress={addNewComment}>
                            <Icon name={'comment'} size={24} color={hasComment ? '#f00' : 'gray'}
                                style={{ marginEnd: 6 }} />
                        </TouchableOpacity>
                        <Text>{2}</Text>
                    </View>
                </View>
                {nbrComments > 0 ? (
                    <TouchableOpacity style={styles.commentBtn} onPress={toggleReplies}>
                        <Text style={styles.showRepliesText}>
                            {showComments ? 'Hide Comments' : `View ${nbrComments} Comments`}
                        </Text>
                    </TouchableOpacity>
                ) : <Text>{" "}</Text>}

            </View>
        </View>
    )
}

export default PostBody;

const styles = StyleSheet.create({
    postContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 9,
        padding: 5,
        marginTop: 10,
    },
    postHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingStart: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    postBody: {
        width: '100%',
    },
    postHeaderImgName: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eee',
    },
    postHeaderImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    postHeaderTitle: {
        marginLeft: 16,
    },
    postHeaderTitleName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#222'
    },
    sinceTexxt: {
        fontSize: 13,
    },
    postBodyText: {
        marginTop: 4,
        marginBottom: 10,
        color: "#000d",
    },
    postBodyImage: {
        width: '100%',
        height: 240,
        borderRadius: 4,
    },
    postFooter: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    postBtns: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 10,
    },
    postFooterIcon: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginEnd: 20,
    },
    moreBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#dddd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    showRepliesText: {
        color: '#666',
    },
    commentBtn: {
        margin: 5,
        padding: 5,
    }
})