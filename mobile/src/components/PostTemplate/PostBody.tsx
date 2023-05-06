import React, { useState } from 'react'
import { StyleSheet, Image, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FullImageView from '../ImageViews/FullImageView';

const PostBody = ({nbrComments, setShowComments,showComments,setShowNewCommentInput}:any): JSX.Element => {
    const [modalVisible, setModalVisible] = useState(false);
    const [islike, setIsLike] = useState(false);
    const [hasComment, setHasComment] = useState(false);

    const toggleReplies = () => {
        setShowComments((prev:any)  => !prev);
    };

    const likeClickHandler = () => {
        setIsLike((prev) => !prev)
    }

    const addNewComment = () => {
        setShowNewCommentInput((prev:any) => !prev);
    }

    const handlePress = () => {
        setModalVisible(true);
    };

    const handleClose = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.postContainer}>
            <View style={styles.postHeader}>
                <View style={styles.postHeaderImgName}>
                    <TouchableOpacity activeOpacity={0.6}>
                        <Image style={styles.postHeaderImage} source={require('../../assets/images/gym.jpg')} />
                    </TouchableOpacity>
                    <View style={styles.postHeaderTitle}>
                        <Text style={styles.postHeaderTitleName}>Ben alla Ismail</Text>
                        <Text style={styles.sinceTexxt}>3 days ago</Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={styles.moreBtn}>
                    <Icon name={'ellipsis-v'} size={14} color={'#000'} />
                </TouchableOpacity>
            </View>
            <View style={styles.postBody}>
                <Text style={styles.postBodyText}>
                    something about your post here ...
                </Text>
                <TouchableOpacity activeOpacity={0.6} onPress={handlePress}>
                    <Image style={styles.postBodyImage} source={require('../../assets/images/gym.jpg')} />
                </TouchableOpacity>

                {modalVisible && <FullImageView source={require('../../assets/images/gym.jpg')} onClose={handleClose} />}
            </View>
            <View style={styles.postFooter}>
                <View style={styles.postBtns}>
                    <View style={styles.postFooterIcon}>
                        <TouchableOpacity activeOpacity={0.6} onPress={likeClickHandler}>
                            <Icon name={'heart'} size={24} color={islike ? '#f00' : 'gray'}
                                style={{
                                    marginEnd: 6,
                                }} />
                        </TouchableOpacity>
                        <Text>21</Text>
                    </View>
                    <View style={styles.postFooterIcon}>
                        <TouchableOpacity activeOpacity={0.6} onPress={addNewComment}>
                            <Icon name={'comment'} size={24} color={hasComment ? '#f00' : 'gray'}
                                style={{ marginEnd: 6 }} />
                        </TouchableOpacity>
                        <Text>21</Text>
                    </View>
                </View>
                {nbrComments > 0 ? (
                    <TouchableOpacity style={styles.commentBtn} onPress={toggleReplies}>
                        <Text style={styles.showRepliesText}>
                            {showComments ? 'Hide Comments' : `View ${nbrComments} Comments`}
                        </Text>
                    </TouchableOpacity>
                ):<Text>{" "}</Text>}

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
        paddingBottom: 12,
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
    postBtns:{
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