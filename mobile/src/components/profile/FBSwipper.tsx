import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';


const FBSwipper = (): JSX.Element => {
    const navigation: any = useNavigation();
    const [swiperIndex, setSwiperIndex] = useState(0);
    const goNext = (newIndex: number) => {
        console.log("the index clicked now is : "+newIndex)
        if (newIndex < 8) {
            setSwiperIndex(() => newIndex);
        }
        else {
            setSwiperIndex(() => 0);
        }
    };

    return (
        <View style={styles.swipperContainer} >
            <Swiper
                index={swiperIndex}
                onIndexChanged={(index) => setSwiperIndex(index)}
                showsButtons={false} loop={true}
                style={styles.wrapper}
                paginationStyle={{
                    position: 'absolute',
                    top: -80,
                    left: 0,
                }}
                dot={<View style={{
                    backgroundColor: '#dddf',
                    width: 12, height: 12,
                    borderRadius: 6, marginLeft: 4,
                    marginRight: 4, marginTop: 4,
                    marginBottom: 4
                }} />}
                activeDot={<View style={{
                    backgroundColor: '#ff5252',
                    width: 14, height: 14,
                    borderRadius: 7, marginLeft: 4,
                    marginRight: 4, marginTop: 4,
                    marginBottom: 4
                }} />}
            >
                <Slide
                    goNext={goNext}
                    currentIndex={swiperIndex}
                    question="How would you rate the overall user experience of the app?"
                />
                <Slide
                    goNext={goNext}
                    currentIndex={swiperIndex}
                    question="How effective do you find the workout challenges provided by the app?"
                />
                <Slide
                    goNext={goNext}
                    currentIndex={swiperIndex}
                    question="How easy is it for you to navigate through the app menus and features?"
                />
                <Slide
                    goNext={goNext}
                    currentIndex={swiperIndex}
                    question="How satisfied are you with the variety of exercises offered by the app?"
                />
                <Slide
                    goNext={goNext}
                    currentIndex={swiperIndex}
                    question="How helpful was the information provided in the app?"
                />
                <Slide
                    goNext={goNext}
                    currentIndex={swiperIndex}
                    question="How much did you enjoy using the app?"
                />
                <Slide
                    goNext={goNext}
                    currentIndex={swiperIndex}
                    question="How satisfied were you with the progress you made while using the app?"
                />
                <Slide
                    goNext={goNext}
                    currentIndex={swiperIndex}
                    question="How likely are you to recommend this app to a friend?"
                /> 
            </Swiper>
        </View>
    );
};

const styles = StyleSheet.create({
    swipperContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#1976d2",
    },
    wrapper: {},
})

export default FBSwipper;

const Slide = ({ goNext, currentIndex, question }: any): JSX.Element => {

    const [checkedIndex, setCheckedIndex] = useState(0);

    const checkReactionHandler = (index: number) => {
        if (index != checkedIndex) { setCheckedIndex(() => index); }
    }

    return (
        <View style={SlideStyle.slide}>
            <View style={SlideStyle.QContainer}>
                <Text style={SlideStyle.Qtext}>{question}</Text>
            </View>
            <View style={SlideStyle.AnswerContainer}>
                <View style={SlideStyle.AnswerRow}>
                    <Reaction
                        index={1}
                        currentIndex={checkedIndex}
                        setIndex={checkReactionHandler}
                        imgUri="very_good.png" title="Very Good" />
                    <Reaction
                        index={2}
                        currentIndex={checkedIndex}
                        setIndex={checkReactionHandler}
                        imgUri="good.png" title="Good" />
                </View>

                <View style={SlideStyle.AnswerRow}>
                    <Reaction
                        index={3}
                        currentIndex={checkedIndex}
                        setIndex={checkReactionHandler}
                        imgUri="fair.png" title="Fair" />
                    <Reaction
                        index={4}
                        currentIndex={checkedIndex}
                        setIndex={checkReactionHandler}
                        imgUri="poor.png" title="Poor" />
                </View>

                <TouchableOpacity
                    onPress={() => goNext(currentIndex + 1)}
                    activeOpacity={0.6}
                    style={SlideStyle.BtnContainer}>
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
        flex: 1,
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
        color: "#fffe",
        fontSize: 36,
        fontWeight: "700",
    },
    AnswerContainer: {
        backgroundColor: "#fff",
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        paddingTop: 34,
        borderTopEndRadius: 16,
        borderTopLeftRadius: 100,
    },
    AnswerRow: {
        display: "flex",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: "row"
    },
    BtnContainer: {
        margin: 5,
        marginTop: 20,
        borderWidth: 2,
        borderColor: "#eee",
        borderRadius: 40,
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 4,
        backgroundColor: "#1976d2"
    },
    icon: {
        marginRight: 0,
        fontSize: 44,
        color: "#fff",
    },
    btn: {
        marginRight: 130,
        marginLeft: 100,
        fontSize: 22,
        fontWeight: "700",
        textTransform: 'uppercase',
        color: "#fff",
    }
})




const Reaction = ({ imgUri, title, setIndex, currentIndex, index }: any): JSX.Element => {



    return (
        <TouchableOpacity
            onPress={() => setIndex(index)}
            activeOpacity={0.5}
            style={ReactionStyle.AnswerItem}>
            <Image
                style={ReactionStyle.image}
                source={{ uri: "asset:/images/" + imgUri }}
            />
            <Text style={ReactionStyle.itemText}>{title}</Text>
            {
                currentIndex == index ? <Icon name="check-circle"
                    color={'#0f0'}
                    size={24} style={ReactionStyle.icon} /> : null
            }
        </TouchableOpacity>
    )
}

const ReactionStyle = StyleSheet.create({
    AnswerItem: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 12,
        paddingHorizontal: 44,
        margin: 7,
        paddingTop: 18,
        paddingBottom: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#59595966",
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 4,
    },
    itemText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1976d2',
    },
    icon: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
})