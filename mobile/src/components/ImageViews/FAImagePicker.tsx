import React, { useState, useEffect } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CameraAnimation from '../../assets/animations/camera.json'
import GalleryAnimation from '../../assets/animations/gallery.json'
import AnimatedLottieView from 'lottie-react-native';
import {
    launchCamera, ImageLibraryOptions, launchImageLibrary, CameraOptions
} from 'react-native-image-picker';
import { useUpLoadImage } from '../../context/providers/UpLoadImageContextProvider';

const FAImagePicker = ({ isVisible, setIsVisible, setImageUrl, setImg_url }: any): JSX.Element => {

    const { uploadImage } = useUpLoadImage()

    const handleImageSelect = () => {
        setIsVisible(() => false);
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 500,
            maxHeight: 500,
            includeBase64: true,
        };

        launchImageLibrary(options, (response) => {
            UpLoad(response)
        });
    };

    const handleCameraSelect = () => {
        setIsVisible(() => false);
        const options: CameraOptions = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 500,
            maxHeight: 500,
            includeBase64: true,
        };

        launchCamera(options, async (response) => {
            UpLoad(response)
        });
    };

    const UpLoad = async (response: any) => {
        if (response.assets && response.assets.length > 0) {
            const uri = response.assets[0].uri
            setImageUrl(() => uri)
            const img_url = await uploadImage(response.assets[0]);
            setImg_url(img_url)

            console.log("__img_url__ : "+img_url)

        } else if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorCode) {
            console.log('there is an error !');
        }
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <TouchableOpacity
                        style={styles.modalButtonCancel}
                        onPress={() => setIsVisible(() => false)}>
                        <Icon style={styles.modalButtonCancelText} name={'times'} size={18} solid color={'#000d'} />
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>Select Image</Text>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleCameraSelect}>
                            <AnimatedLottieView
                                source={CameraAnimation}
                                autoPlay
                                loop
                                speed={1.5}
                                resizeMode="contain"
                                style={{
                                    width: 60,
                                    height: 60,
                                    backgroundColor: 'transparent',
                                }}
                            />
                            <Text style={styles.modalButtonText}>Camera</Text>
                        </TouchableOpacity>


                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleImageSelect}>
                            <AnimatedLottieView
                                source={GalleryAnimation}
                                autoPlay
                                loop
                                speed={1.5}
                                resizeMode="contain"
                                style={{
                                    width: 60,
                                    height: 60,
                                    backgroundColor: 'transparent',
                                }}
                            />
                            <Text style={styles.modalButtonText}>Gallery</Text>
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
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalButton: {
        flex: 1,
        margin: 5,
        padding: 10,
        alignSelf: 'stretch',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        marginBottom: 10,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
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
    btnContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 30,
    }
});

export default FAImagePicker;
