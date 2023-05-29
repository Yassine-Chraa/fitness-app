import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import logOutAnimation from '../../assets/animations/Log-Out.json'
import AnimatedLottieView from 'lottie-react-native';


const LogOutMOdal = ({ isVisible, setIsVisible, logOut }: any): JSX.Element => {

    const logOutAction = async () => {
        logOut()
        setIsVisible(() => false)
    }

    const cancelAction = () => {
        setIsVisible(() => false)
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Are You Sure ?</Text>
                    <View style={styles.animationContainer}>
                        <AnimatedLottieView
                            source={logOutAnimation}
                            autoPlay
                            loop
                            speed={1.5}
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
                            onPress={logOutAction}
                        >
                            <Text style={styles.sureBtnText}>Sure</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={cancelAction}
                        >
                            <Text style={styles.cancelBtnText}>Cancel</Text>
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
    sureBtn:{
        width: 100,
        height: 35,
        backgroundColor: '#0001',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'red',
        borderWidth:1
    },
    cancelBtn:{
        width: 100,
        height: 35,
        backgroundColor: '#0001',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#00770077',
        borderWidth:1
    }
});

export default LogOutMOdal;
