import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFeedBack } from '../../../context/providers/FeedBackContextProvider';
import UserInfo from '../../../types/UserInfo';
import getData from '../../../Helpers/Storage/getData';
import { useNavigation } from '@react-navigation/native';


const FBLastSlide = ({ goNext, question, currentIndex, feedback, setFeedback }: any): JSX.Element => {

    const [checkedIndex, setCheckedIndex] = useState(feedback["f" + (currentIndex + 1)]);
    const [text, setText] = useState('');
    const { addFeedBack } = useFeedBack();
    const navigation: any = useNavigation();

    const checkReactionHandler = (index: number) => {
        if (index != checkedIndex) {
            setCheckedIndex(() => index);
            feedback["f" + (currentIndex + 1)] = index;
            setFeedback(() => feedback);
        }
    }

    const updateFeedBack = () => {
        feedback["message"] = text;
        setFeedback(() => feedback);
    }

    const sendFeedback = () => {
        updateFeedBack();
        addFeedBack(feedback).then(() => {
            navigation.goBack()
        })
    }

    useEffect(() => {
        getData("current_user").
            then((user: UserInfo) => {
                if (user.user) {
                    feedback.id = user.user.id
                    setFeedback(() => feedback);
                }
            })
    }, [])

    return (
        <View style={SlideStyle.slide}>

            <View style={SlideStyle.TitleContainer}>
                <Text style={SlideStyle.Title}>{question}</Text>
            </View>

            <View style={SlideStyle.InputContainer}>
                <TextInput
                    multiline={true}
                    numberOfLines={30}
                    scrollEnabled={true}
                    onBlur={updateFeedBack}
                    placeholder="Type your feedback here..."
                    onChangeText={(text) => setText(text)}
                    value={text}
                    style={SlideStyle.textInput}
                />
            </View>

            <View style={SlideStyle.BackBtnContainer}>
                <TouchableOpacity
                    onPress={() => goNext(currentIndex - 1)}
                    activeOpacity={0.6}
                >
                    <Icon name="chevron-circle-left"
                        color={'#fff'} size={16} style={SlideStyle.BackIcon} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={sendFeedback}
                activeOpacity={0.6}
                style={SlideStyle.BtnContainer}>
                <Text style={SlideStyle.btn}>Send</Text>
            </TouchableOpacity>


        </View>
    )
}

export default FBLastSlide

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
    TitleContainer: {
        padding: 10,
        margin: 10,
        marginVertical: 30,
    },
    Title: {
        textAlign: 'center',
        color: "#fffe",
        fontSize: 28,
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
        margin: 20,
        borderRadius: 40,
        display: "flex",
        justifyContent: "space-around",
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 40,
        backgroundColor: "#fff",
        shadowColor: 'rgba(2, 2, 2, 0.4)',
        shadowOpacity: 1.5,
        elevation: 8,
        shadowRadius: 20,
        shadowOffset: { width: 1, height: 13 },
    },
    btn: {
        marginHorizontal: 50,
        fontSize: 32,
        fontWeight: "700",
        textTransform: 'uppercase',
        color: "#1976d2",
    },
    BackBtnContainer: {
        position: 'absolute',
        top: 7, left: 10,
    },
    BackIcon: {
        marginRight: 0,
        fontSize: 30,
        color: "#fff",
    },
    InputContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '94%',
        height: '100%',
        flex: 1,
        backgroundColor: '#00000055',
        borderRadius: 12,
    },
    textInput: {
        width: '100%',
        fontSize: 18,
        color: '#fff',
        lineHeight: 24,
        padding: 10,
        fontFamily: 'arial',
        textAlignVertical: 'top',
    },
})
