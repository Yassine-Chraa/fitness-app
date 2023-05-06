import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    View, TextInput, Image, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PostType from '../../types/PostType';
import { usePost } from '../../context/providers/PostContextProvider';
import FAImagePicker from '../FAImageHandlers/FAImagePicker';

const PostInput = ({ user_id,reLoadPosts }: any) => {
    const [text, setText] = useState('');
    const [currentImageUrl, setCurrentImageUrl] = useState('');
    const [img_url, setImg_url] = useState('')
    const [isVisible, setIsVisible] = useState(false);
    const { addPost } = usePost();

    const handleTextChange = (content: string) => {
        setText(() => content)
    };

    const handlePost = async () => {
        const post: PostType = {
            content: text,
            image_url: img_url,
            user_id: user_id,
        }
        const result = await addPost(post);
        if(result){
            setImg_url(() => '');
            setCurrentImageUrl(() => '');
            setText(() => '');
            reLoadPosts();
        }
    };

    const displayModalHandler = () => {
        setIsVisible(() => true);
    }

    return (
        <>
            <FAImagePicker setIsVisible={setIsVisible}
                isVisible={isVisible}
                setCurrentImageUrl={setCurrentImageUrl}
                setImg_url={setImg_url}
            />

            <View style={styles.container}>
                <View style={{ ...styles.showImage, borderWidth: currentImageUrl ? 1 : 0 }}>
                    {currentImageUrl && <Image source={{ uri: currentImageUrl }} style={styles.selectedImage} />}
                </View>
                <View style={styles.contentAreaContainer}>
                    <TouchableOpacity style={styles.writerImageContainer} onPress={() => console.log('')}>
                        <Image source={require('../../assets/images/person.jpg')} style={styles.WriterImage} />
                    </TouchableOpacity>
                    <View style={styles.postArea}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Write Your Post here..."
                                multiline={true}
                                onChangeText={handleTextChange}
                                value={text}
                                style={styles.textInput}
                            />
                        </View>

                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.galleryButton} activeOpacity={0.5}
                                onPress={displayModalHandler}>
                                <Icon name={'image'} size={18} solid color={'#000d'} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postButton} activeOpacity={0.5}
                                onPress={handlePost} disabled={!text && !currentImageUrl}>
                                <Text style={styles.postButtonText}>Post</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        borderColor: '#bbbf',
        borderWidth: 1,
        borderRadius: 10,
    },
    postArea: {
        flex: 1,
    },
    contentAreaContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 4,
    },
    cameraButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#333',
    },
    cameraIcon: {
        width: 30,
        height: 30,
    },
    inputContainer: {
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#0005',
        padding: 4,
        flex: 1,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
    },
    galleryButton: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#0004',
    },
    writerImageContainer: {
        backgroundColor: '#00008B',
        borderRadius: 16,
        marginRight: 2,
    },
    WriterImage: {
        height: 32,
        width: 32,
        borderRadius: 16,
    },
    btnContainer: {
        flex: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 3,
        paddingVertical: 2,
    },
    postButton: {
        flex: 0,
        backgroundColor: '#ddd',
        paddingVertical: 4,
        paddingHorizontal: 14,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#0004',
    },
    postButtonText: {
        color: '#000a',
        fontWeight: '500',
        fontSize: 15,
    },
    showImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderColor: '#0006',
        borderRadius: 6,
    },
    selectedImage: {
        margin: 4,
        height: 200,
        width: 200,
        borderRadius: 4,
    }
});


export default PostInput;
