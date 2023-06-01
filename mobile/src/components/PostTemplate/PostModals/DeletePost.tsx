import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import deleteAnimation from '../../../assets/animations/delete-animation.json'
import AnimatedLottieView from 'lottie-react-native';
import { usePost } from '../../../context/providers/PostContextProvider';


const DeletePost = ({ isDelete, setIsDelete, setIsOption, reLoadPosts, id }: any): JSX.Element => {

    const { deletePost } = usePost()

    const yesDeletehanlder = async () => {
        setIsDelete(() => false);
        setIsOption(() => true);
        const result = await deletePost(id);
        if (result) {
            reLoadPosts()
        }
    }

    const noDeletehanlder = () => {
        setIsDelete(() => false);
        setIsOption(() => true);
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isDelete}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Are You Sure ?</Text>
                    <View style={styles.animationContainer}>
                        <AnimatedLottieView
                            source={deleteAnimation}
                            autoPlay
                            loop
                            speed={1}
                            resizeMode="contain"
                            style={{
                                width: 200,
                                height: 200,
                                backgroundColor: 'transparent',
                            }}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.sureBtn}
                            onPress={yesDeletehanlder}
                        >
                            <Text style={styles.sureBtnText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={noDeletehanlder}
                        >
                            <Text style={styles.cancelBtnText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    animationContainer: {
        borderWidth: 1,
        borderColor: '#f004',
        borderRadius: 20,
        margin: 3,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'red',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 35,
        marginTop: 13,
    },
    button: {
        width: 100,
        height: 35,
        backgroundColor: '#2196F3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    sureBtnText: {
        color: 'red',
        fontSize: 16,
    },
    cancelBtnText: {
        color: '#007700',
        fontSize: 16,
    },
    sureBtn: {
        width: 100,
        height: 35,
        backgroundColor: '#0001',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'red',
        borderWidth: 1
    },
    cancelBtn: {
        width: 100,
        height: 35,
        backgroundColor: '#0001',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#00770077',
        borderWidth: 1
    }
});

export default DeletePost;
