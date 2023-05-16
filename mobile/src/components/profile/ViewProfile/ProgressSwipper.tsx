import { useNavigation } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react'
import { StyleSheet, Image, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CameraTakeNewProgress from '../../../assets/animations/new_progress_picture.json'


const ProgressSwipper = ({ images, imageStyle, title }: any): JSX.Element => {
    const navigation: any = useNavigation();

    return (
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
                    onPress={() => console.log("add new progress picture ?!!")}>
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
                    {images.map((image: any, index: any) => {
                        return (
                            <TouchableOpacity activeOpacity={0.6} key={index}
                                onPress={() => navigation.navigate("ImageSwipper", { images: images, index: index })}>
                                <Image source={image} style={{ ...styles.ScrollImage, ...imageStyle }} />
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
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
    swipperAndButton:{
        flexDirection: 'row',
    },
    newProgressPictureBtn:{
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