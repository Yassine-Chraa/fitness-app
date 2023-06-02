import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CameraTakeNewProgress from '../../../assets/animations/new_progress_picture.json'
import { useImages } from '../../../context/providers/ImagesContextProvider';
import ImageType from '../../../types/ImageType';
import FAImagePicker from '../../FAImageHandlers/FAImagePicker';

const ProgressSwipper = ({ imageStyle, title, user_id }: any): JSX.Element => {
    const navigation: any = useNavigation();
    const [images, setImages] = useState<Array<ImageType>>([]);
    const { getImages, addImage } = useImages();
    const [img_url, setImageURL] = useState<string>('');
    const [isVisible, setIsVisible] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState<string>('')

    const loadImages = async () => {
        const data = await getImages(user_id);
        if (data) {
            setImages(() => data)
        }
    }

    const addNewImage = async (img_url: string) => {
        const NewIMG: ImageType = { id: 1, user_id: user_id, img_url: img_url }
        const result = await addImage(NewIMG)
        if (result) {
            loadImages()
        }
    }

    const handleUploadNewImage = () => {
        setIsVisible(() => true)
    }

    useEffect(() => {
        loadImages();
    }, [])

    useEffect(() => {
        if (img_url != '') {
            addNewImage(img_url)
            setImageURL(() => '')
        }
    }, [img_url])

    return (
        <>
            <FAImagePicker isVisible={isVisible}
                setCurrentImageUrl={setCurrentImageUrl}
                setIsVisible={setIsVisible}
                setImageURL={setImageURL} />

            <View style={styles.littleSwipperContainer}>
                <TouchableOpacity activeOpacity={0.5}
                    style={styles.littleSwipperHeader}
                    onPress={() => navigation.navigate('ImageGallery', { images: images })} >
                    <Text>{title}</Text>
                    <Icon name={'chevron-right'} size={14} />
                </TouchableOpacity>

                <View style={styles.swipperAndButton}>

                    <TouchableOpacity
                        style={styles.newProgressPictureBtn}
                        activeOpacity={0.6} key={"to_add_new_progress_picture"}
                        onPress={() => handleUploadNewImage()}>
                        <AnimatedLottieView
                            source={CameraTakeNewProgress}
                            autoPlay
                            loop
                            speed={1}
                            resizeMode="contain"
                            style={{
                                width: 60,
                                height: 60,
                                backgroundColor: 'transparent',
                            }}
                        />
                    </TouchableOpacity>

                    <ScrollView horizontal={true}>
                        {images && images.length > 0 && images.map((image: ImageType, index: any) => {
                            return (
                                <TouchableOpacity activeOpacity={0.6} key={index}
                                    onPress={() => navigation.navigate("ImageSwipper", { images: images, index: index })}>
                                    <Image source={{ uri: image.img_url }} style={{ ...styles.ScrollImage, ...imageStyle }} />
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        </>
    )
}

export default ProgressSwipper;

const styles = StyleSheet.create({
    ScrollImage: {
        width: 70,
        height: 70,
        margin: 5,
    },
    littleSwipperContainer: {
        marginVertical: 10,
    },
    littleSwipperHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 8
    },
    swipperAndButton: {
        flexDirection: 'row',
    },
    newProgressPictureBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#fefefe',
        margin: 5,
        borderColor: '#0003',
        borderWidth: 1,
        borderRadius: 15,
    }
})