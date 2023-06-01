import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Swiper from 'react-native-swiper';
import FeedBack from '../../../types/FeedBack';
import getData from '../../../Helpers/Storage/getData';
import UserInfo from '../../../types/UserInfo';
import { useFeedBack } from '../../../context/providers/FeedBackContextProvider';
import FBSlide from './FBSlide';
import FBLastSlide from './FBLastSlide';


const questions = [
    "How would you rate the overall user experience of the app?",
    "How effective do you find the workout challenges provided by the app?",
    "How easy is it for you to navigate through the app menus and features?",
    "How satisfied are you with the variety of exercises offered by the app?",
    "Please consider leaving a comment down below to let us know your thoughts.",
];

const __FEEDBACK__: FeedBack = {
    id: 1,
    user_id: 1,
    message: "No message !",
    f1: 1,
    f2: 1,
    f3: 1,
    f4: 1,
}

const FeedBackComponents = (): JSX.Element => {
    const [swiperIndex, setSwiperIndex] = useState(0);
    const [feedback, setFeedback] = useState<FeedBack>(__FEEDBACK__);
    const [user, setUser] = useState<UserInfo>();
    const { addFeedBack } = useFeedBack();

    const goNext = (newIndex: number) => {
        if (0 <= newIndex && newIndex < questions.length) {
            setSwiperIndex(() => newIndex);
        } else if (newIndex >= questions.length) {
            setSwiperIndex(() => questions.length - 1);
        }
        else {
            setSwiperIndex(() => 0);
        }
    };

    return (
        <View style={styles.swipperContainer} >
            <Swiper
                index={swiperIndex}
                pinchGestureEnabled={false}
                scrollEnabled={false}
                showsButtons={false} loop={false}
                style={styles.wrapper}
                paginationStyle={
                    questions.length - 1 == swiperIndex ? {
                        position: 'absolute',
                        top: '-90%',
                        left: 0,
                    } : {
                        position: 'absolute',
                        top: -80,
                        left: 0,
                    }
                }
                dot={
                    <View style={{
                        backgroundColor: '#dddf',
                        width: 12, height: 12,
                        borderRadius: 6, marginLeft: 4,
                        marginRight: 4, marginTop: 4,
                        marginBottom: 4
                    }}
                    />
                }
                activeDot={<View style={{
                    backgroundColor: '#ff5252',
                    width: 14, height: 14,
                    borderRadius: 7, marginLeft: 4,
                    marginRight: 4, marginTop: 4,
                    marginBottom: 4
                }} />}
            >
                {
                    questions.map((question, index) =>
                        <FBSlide
                            key={question + index}
                            goNext={goNext}
                            currentIndex={swiperIndex}
                            question={question}
                            setFeedback={setFeedback}
                            feedback={feedback}
                            isEnd={index == questions.length - 1}
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
