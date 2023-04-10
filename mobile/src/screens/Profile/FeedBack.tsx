import { useState } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import Screen from '../../components/Screen';
import FBSwipper from '../../components/profile/FBSwipper';



const FeedBack = ({ route, navigation }: any) => {

    return (
        <Screen
            name={'FeedBack'}
            backButton
            action="save"
            actionFunction={null}>
            <FBSwipper />
        </Screen>
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