import { Input } from '@rneui/base';
import React, { useState, useEffect } from 'react';
import {
    View,
    Modal,
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PostType from '../../../types/PostType';
import { usePost } from '../../../context/providers/PostContextProvider';
import { useAuth } from '../../../context/providers/AuthContextProvider';


const RePostPost = ({ post, isRePostPost, setIsRePostPost, setIsOption, reLoadPosts }: any): JSX.Element => {
    const { currentUser } = useAuth();
    const user = currentUser?.user;
    const [text, setText] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const { addPost } = usePost();

    const closeRePostPosthandler = () => {
        setIsRePostPost(() => false);
        setIsOption(() => true);
    }


    const handleSaveEditedPost = async () => {
        closeRePostPosthandler()
        const editedPost: PostType = {
            id: post.id,
            user_id: user.id,
            content: text,
            image_url: imgUrl,
        }
        const result = await addPost(editedPost);
        if (result) {
            reLoadPosts();
        }
    }

    const handleTextChange = (content: string) => {
        setText(() => content)
    };

    useEffect(() => {
        const author = `Posted By "${post.user.name}",\n`;
        setText(() => author + post.content);
        setImgUrl(() => post.image_url);
    }, [])


    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isRePostPost}
                onRequestClose={() => setIsRePostPost(() => true)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.modalButtonCancel}
                            onPress={() => setIsRePostPost(() => false)}>
                            <Icon style={styles.modalButtonCancelText} name={'times'} size={18} solid color={'#000d'} />
                        </TouchableOpacity>


                        <View style={styles.postContainer}>

                            <View style={styles.postTitleContainer}>
                                <Text style={styles.postTitle}>Edit Then Repost</Text>
                                <View style={styles.quoteContainer}>
                                    <Text style={styles.quoteText}>"Sharing is caring: Mention the creators, spread the love."</Text>
                                </View>
                            </View>

                            <View style={styles.ImageContainer} >

                                <Image source={{
                                    uri: imgUrl ? imgUrl :
                                        "https://res.cloudinary.com/dtveiunmn/image/upload/v1677458808/profile_w8hn3z.png"
                                }}
                                    style={styles.Image} />
                            </View>

                            <View style={styles.postButtonContainer}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder="Write Your Post here..."
                                        multiline={true}
                                        onChangeText={handleTextChange}
                                        value={text}
                                        style={styles.textInput}
                                    />
                                </View>

                                <TouchableOpacity style={styles.postButton} activeOpacity={0.5}
                                    onPress={handleSaveEditedPost}
                                >
                                    <Text style={styles.postButtonText}>re-post</Text>
                                </TouchableOpacity>

                            </View>
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
    modalContent: {
        backgroundColor: 'white',
        padding: 4,
        borderRadius: 8,
        width: '85%',
        height: '75%',
    },
    closeButton: {
        fontSize: 18,
        color: 'red',
        alignSelf: 'flex-end',
    },

    modalButtonCancel: {
        position: 'absolute',
        zIndex: 4,
        top: 0,
        right: 0,
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 16,
        margin: 6,
    },
    postButtonContainer: {
        marginTop: 6,
    },
    modalButtonCancelText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    postContainer: {
        padding: 5,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    postButton: {
        flex: 0,
        backgroundColor: '#000d',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#0003',
        marginTop: 12,
    },

    postButtonText: {
        color: '#fffe',
        fontWeight: '500',
        fontSize: 15,
        textAlign: 'center',
    },
    textInput: {
        fontSize: 16,
        textAlignVertical: 'top',
    },
    inputContainer: {
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#0005',
        padding: 4,
        height: '46%',
    },
    ImageContainer: {
        backgroundColor: '#0002',
        borderRadius: 8,
        height: '40%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 24,
    },
    Image: {
        flex: 1,
        height: "80%",
        width: "100%",
        borderRadius: 8,
    },
    postTitleContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    postTitle: {
        fontSize: 18,
        color: '#000d',
    },

    quoteContainer: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 6,
        marginHorizontal: 8,
        marginTop: 8,
        marginBottom: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    quoteText: {
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

export default RePostPost;
