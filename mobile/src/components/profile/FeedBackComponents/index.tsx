import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Swiper from 'react-native-swiper';
import FeedBack from '../../../types/FeedBack';
import getData from '../../../Helpers/Storage/getData';
import UserInfo from '../../../types/UserInfo';
import { useFeedBack } from '../../../context/providers/FeedBackContextProvider';
import FBSlide from './FBSlide';


const questions = [
    "How would you rate the overall user experience of the app?",
    "How effective do you find the workout challenges provided by the app?",
    "How easy is it for you to navigate through the app menus and features?",
    "How satisfied are you with the variety of exercises offered by the app?",
    "How helpful was the information provided in the app?",
    "How much did you enjoy using the app?",
    "How satisfied were you with the progress you made while using the app?",
    "How likely are you to recommend this app to a friend?",
    "How likely are you to recommend this app to a friend? fake question 11",
    "How likely are you to recommend this app to a friend? fake question 22",
    "How likely are you to recommend this app to a friend? fake question 33",
    "How likely are you to recommend this app to a friend? fake question 44",
];

const __FEEDBACK__: FeedBack = {
    id: 1,
    user_id: 1,
    message: "No message !",
    f1: 1,
    f2: 2,
    f3: 3,
    f4: 4,
    f5: 1,
    f6: 1,
    f7: 1,
    f8: 1,
    f9: 1,
    f10: 1,
    f11: 1,
    f12: 1,
}

const FeedBackComponents = (): JSX.Element => {
    const navigation: any = useNavigation();
    const [swiperIndex, setSwiperIndex] = useState(0);
    const [feedback, setFeedback] = useState<FeedBack>(__FEEDBACK__);
    const [user, setUser] = useState<UserInfo>();
    const { addFeedBack } = useFeedBack();

    const goNext = (newIndex: number) => {
        if (0 <= newIndex && newIndex < questions.length) {
            setSwiperIndex(() => newIndex);
        } else if (newIndex >= questions.length) {
            setSwiperIndex(() => questions.length - 1);
            if (user?.user) {
                feedback.id = user.user.id
                setFeedback(() => feedback);
            }
            addFeedBack(feedback).then((info) => {
                console.log(info)
            }).catch(() => {
                console.log("There was an error while uploading the current feedback !")
            })
        }
        else {
            setSwiperIndex(() => 0);
        }
    };

    useEffect(() => {
        getData("current_user").
            then((user: UserInfo) => setUser(() => user))
    }, [])

    return (
        <View style={styles.swipperContainer} >
            <Swiper
                index={swiperIndex}
                pinchGestureEnabled={false}
                scrollEnabled={false}
                showsButtons={false} loop={false}
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
                {
                    questions.map(question =>
                        <FBSlide
                            goNext={goNext}
                            currentIndex={swiperIndex}
                            question={question}
                            setFeedback={setFeedback}
                            feedback={feedback}
                        />)
                }
            </Swiper>
        </View>
    );
};

export default FeedBackComponents;

const styles = StyleSheet.create({
    swipperContainer: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "#1976d2",
    },
    wrapper: {},
})
