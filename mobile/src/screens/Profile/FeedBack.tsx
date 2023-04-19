import { useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import Screen from '../../components/Screen';
import FBSwipper from '../../components/profile/FBSwipper';
import { SafeAreaView } from 'react-native-safe-area-context';



const FeedBack = ({ route, navigation }: any) => {

    return (
        <SafeAreaView style={{
            flex: 1,
            margin: 0,
            padding: 0,
        }}>
            <FBSwipper />
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