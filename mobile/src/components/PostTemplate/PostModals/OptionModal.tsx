import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EditPost from './EditPost';
import RePostPost from './RePostPost';
import DeletePost from './DeletePost';
import { useAuth } from '../../../context/providers/AuthContextProvider';
import { setIsCheckStateOk, useUIController } from '../../../context/UIContext';

const OptionModal = ({ isOption, setIsOption, post, reLoadPosts }: any): JSX.Element => {
    const [isEditPost, setIsEditPost] = useState<boolean>(false);
    const [isRePostPost, setIsRePostPost] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const { currentUser } = useAuth();
    const user = currentUser?.user;
    const [controller, dispatch] = useUIController()

    const openEditPostHandler = () => {
        if (post.user.id == user.id) {
            setIsEditPost(() => true);
            setIsOption(() => false);
        } else {
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: false,
                    message: "Ooops, You Cannot edit this Post, You are not the owner !"
                });
        }
    }

    const openRepostPostHandler = () => {
        if (post.user.id == user.id) {
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: false,
                    message: "Ooops, It is already your post !"
                });
        } else {
            setIsRePostPost(() => true);
            setIsOption(() => false);
        }
    }

    const openDeletePostHandler = () => {
        if (post.user.id == user.id) {
            setIsDelete(() => true);
            setIsOption(() => false);
        } else {
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: false,
                    message: "Ooops, It is already your post !"
                });
        }

    }

    return (
        <>
            {/*------------------(Edit Post)-------------------*/}
            <EditPost isEditPost={isEditPost}
                setIsEditPost={setIsEditPost}
                post={post}
                setIsOption={setIsOption}
                reLoadPosts={reLoadPosts}
            />
            {/*------------------(Repost Post)-------------------*/}
            <RePostPost isRePostPost={isRePostPost}
                setIsRePostPost={setIsRePostPost}
                post={post}
                setIsOption={setIsOption}
                reLoadPosts={reLoadPosts}
            />
            {/*------------------(delete Post)-------------------*/}
            <DeletePost
                isDelete={isDelete}
                setIsDelete={setIsDelete}
                setIsOption={setIsOption}
                id={post.id}
                reLoadPosts={reLoadPosts}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={isOption}
                onRequestClose={() => setIsOption(() => true)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.modalButtonCancel}
                            onPress={() => setIsOption(() => false)}>
                            <Icon style={styles.modalButtonCancelText} name={'times'} size={18} solid color={'#000d'} />
                        </TouchableOpacity>
                        <View style={styles.optionContainer}>
                            <TouchableOpacity
                                style={styles.option}
                                onPress={openEditPostHandler}>
                                <Icon style={styles.optionIcon} name={'edit'} size={18} solid color={'#000d'} />
                                <Text style={styles.optionText}>edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.option}
                                onPress={openRepostPostHandler}>
                                <Icon style={styles.optionIcon} name={'share'} size={18} solid color={'#000d'} />
                                <Text style={styles.optionText}>repost</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.option}
                                onPress={openDeletePostHandler}>
                                <Icon style={styles.optionIcon} name={'trash-alt'} size={18} solid color={'#000d'} />
                                <Text style={styles.optionText}>delete</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    optionContainer: {
        marginTop: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '50%'
    },
    closeButton: {
        fontSize: 18,
        color: 'red',
        alignSelf: 'flex-end',
    },
    option: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        marginVertical: 6,
        backgroundColor: '#0003',
        borderRadius: 5,
        padding: 10,
    },
    optionIcon: {
        color: '#0009',
    },
    optionText: {
        fontSize: 16,
        color: '#0009'
    },
    modalButtonCancel: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 16,
        margin: 4,
    },
    modalButtonCancelText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default OptionModal;
