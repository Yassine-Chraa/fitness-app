import { useNavigation } from '@react-navigation/native';
import { Button, Image } from '@rneui/base';
import { wrap } from 'module';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FBSwipper = (): JSX.Element => {
    const navigation: any = useNavigation();

    return (
        <View style={styles.wrapper} >
            <Swiper
                showsButtons={false}
                style={styles.swipperContainer}
                dot={<View style={{
                    backgroundColor: 'rgba(0,f,0,.2)',
                    width: 8, height: 8,
                    borderRadius: 4, marginLeft: 3,
                    marginRight: 3, marginTop: 3,
                    marginBottom: 3,
                    position: 'absolute',
                    top:0,left:2
                }} 
                />}
            >
                <Slide />
                <Slide />
                <Slide />
                <Slide />
                <Slide />
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swipperContainer: {
        width: "100%",
        height: "100%",
    },
})

export default FBSwipper;

const Slide = (): JSX.Element => {
    return (
        <View style={SlideStyle.slide}>
            <View style={SlideStyle.QContainer}>
                <Text style={SlideStyle.Qtext}>how did you find our app ? is it helpfull for you ?</Text>
            </View>
            <View style={SlideStyle.AnswerContainer}>
                <View style={SlideStyle.AnswerRow}>
                    <View style={SlideStyle.AnswerItem}>
                        <Image
                            style={SlideStyle.image}
                            source={{ uri: 'https://placehold.jp/60x60.png' }}
                        />
                        <Text>Very Good</Text>
                    </View>
                    <View style={SlideStyle.AnswerItem}>
                        <Image
                            style={SlideStyle.image}
                            source={{ uri: 'https://placehold.jp/60x60.png' }}
                        />
                        <Text>Very Good</Text>
                    </View>
                </View>

                <View style={SlideStyle.AnswerRow}>
                    <View style={SlideStyle.AnswerItem}>
                        <Image
                            style={SlideStyle.image}
                            source={{ uri: 'https://placehold.jp/60x60.png' }}
                        />
                        <Text>Very Good</Text>
                    </View>
                    <View style={SlideStyle.AnswerItem}>
                        <Image
                            style={SlideStyle.image}
                            source={{ uri: 'https://placehold.jp/60x60.png' }}
                        />
                        <Text>Very Good</Text>
                    </View>
                </View>

                <TouchableOpacity activeOpacity={0.6} style={SlideStyle.BtnContainer}>
                    <Icon name="chevron-circle-right" color={'#fff'} size={16} style={SlideStyle.icon} />
                    <Text style={SlideStyle.btn}>next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const SlideStyle = StyleSheet.create({
    slide: {
        height: "100%",
        width: "100%",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    QContainer: {
        padding: 10,
        margin: 10,
        marginVertical: 25,
    },
    Qtext: {
        fontSize: 36,
        fontWeight: "700",
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 4,
    },
    AnswerContainer: {
        backgroundColor: "#ddd",
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 80,
    },
    AnswerItem: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 18,
        paddingHorizontal: 25,
        margin: 20,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
    },
    AnswerRow: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row"
    },
    BtnContainer: {
        margin: 5,
        marginTop: 14,
        borderWidth: 2,
        borderColor: "#eee",
        borderRadius: 40,
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 4,
        backgroundColor: "gray"
    },
    icon: {
        marginRight: 40,
        fontSize: 34,
        color: "blue",
    },
    btn: {
        marginRight: 50,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: "700",
        textTransform: 'uppercase',
    }
})