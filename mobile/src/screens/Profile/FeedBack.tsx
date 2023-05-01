import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FeedBackComponents from '../../components/profile/FeedBackComponents';



const FeedBack = ({ route, navigation }: any) => {

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

const styles = StyleSheet.create({
    heading: {
        marginBottom: 32,
        marginTop: 16,
        alignItems: 'center',
        width: 90,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

export default FeedBack;