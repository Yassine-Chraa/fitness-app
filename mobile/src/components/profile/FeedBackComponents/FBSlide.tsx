import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FBReaction from './FBReaction';
import FBLastSlide from './FBLastSlide';
import theme from '../../../constants/theme';
import { useNavigation } from '@react-navigation/native';


const FBSlide = ({ goNext,
    currentIndex,
    question,
    feedback,
    setFeedback,
    isEnd
}: any): JSX.Element => {

    const navigation:any  = useNavigation();
    const [checkedIndex, setCheckedIndex] = useState(feedback["f" + (currentIndex + 1)]);

    const checkReactionHandler = (index: number) => {
        if (index != checkedIndex) {
            setCheckedIndex(() => index);
            feedback["f" + (currentIndex + 1)] = index;
            setFeedback(() => feedback);
        }
    }

    return (
        <>
            {isEnd ?
                <FBLastSlide
                    goNext={goNext}
                    currentIndex={currentIndex}
                    setFeedback={setFeedback}
                    feedback={feedback}
                    question={question}
                /> :

                <View style={SlideStyle.slide}>
                    <View style={SlideStyle.QContainer}>
                        <Text style={SlideStyle.Qtext}>{question}</Text>
                    </View>
                    <View style={SlideStyle.AnswerContainer}>
                        <View style={SlideStyle.AnswerRow}>
                            <FBReaction
                                index={1}
                                currentIndex={checkedIndex}
                                setIndex={checkReactionHandler}
                                imgUri="very_good.png" title="Very Good" />
                            <FBReaction
                                index={2}
                                currentIndex={checkedIndex}
                                setIndex={checkReactionHandler}
                                imgUri="good.png" title="Good" />
                        </View>

                        <View style={SlideStyle.AnswerRow}>
                            <FBReaction
                                index={3}
                                currentIndex={checkedIndex}
                                setIndex={checkReactionHandler}
                                imgUri="fair.png" title="Fair" />
                            <FBReaction
                                index={4}
                                currentIndex={checkedIndex}
                                setIndex={checkReactionHandler}
                                imgUri="poor.png" title="Poor" />
                        </View>

                        <View style={SlideStyle.navigation}>
                            {currentIndex > 0 ? (<TouchableOpacity
                                onPress={() => goNext(currentIndex - 1)}
                                activeOpacity={0.6}
                                style={SlideStyle.BtnContainer}>
                                <Icon name="chevron-circle-left" color={'#fff'} size={16} style={SlideStyle.icon} />
                                <Text style={SlideStyle.btn}>Back</Text>
                            </TouchableOpacity>) : (
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    activeOpacity={0.6}
                                    style={{...SlideStyle.BtnContainer,backgroundColor: theme.colors.danger}}>
                                    <Icon name="chevron-circle-left" color={'#fff'} size={16} style={SlideStyle.icon} />
                                    <Text style={SlideStyle.btn}>Exit</Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                onPress={() => goNext(currentIndex + 1)}
                                activeOpacity={0.6}
                                style={{ ...SlideStyle.BtnContainer, flexDirection: 'row-reverse' }}>
                                <Icon name="chevron-circle-right" color={'#fff'} size={16} style={SlideStyle.icon} />
                                <Text style={SlideStyle.btn}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }

        </>
    )
}

export default FBSlide

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
        marginRight: 10,
        marginLeft: 10,
        fontSize: 22,
        fontWeight: "700",
        textTransform: 'uppercase',
        color: "#fff",
    },
    navigation: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%'
    }
})



