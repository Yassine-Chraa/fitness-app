import React from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


const FAconfimrCancelImage = ({ isOkYesImageOpen, YesUpload, NoUpload, image }: any): JSX.Element => {

    const handleOkPress = () => {
        YesUpload()
    }

    const handleCancelPress = () => {
        NoUpload()
    }


    return (
        <Modal animationType="slide" transparent={true} visible={isOkYesImageOpen}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Image
                        source={image}
                        style={styles.image}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleOkPress}
                        >
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleCancelPress}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
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
    image: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
        resizeMode: 'cover',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 35,
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
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default FAconfimrCancelImage;
