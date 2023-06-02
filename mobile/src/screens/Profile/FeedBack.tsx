import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeedBackComponents from '../../components/profile/FeedBackComponents';



const FeedBack = () => {

    return (
        <SafeAreaView style={{
            flex: 1,
            margin: 0,
            padding: 0,
        }}>
            <FeedBackComponents/>
        </SafeAreaView>
    );
};


export default FeedBack;