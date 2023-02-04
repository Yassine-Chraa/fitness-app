import React from 'react';
import {
    StyleSheet, ScrollView, View
} from 'react-native';
import UserDesc from'./UserDesc';
import InfoGroup from './InfoGroup';
import Options from './Options';
import TopButtons from './TopButtons';


function UserProfile(): JSX.Element {

    const titles = ['150', '0.0', '22.14']
    const values = ['weight (Kg)', 'Body fat (%)', 'BMI']

    return (
        <ScrollView>
            <View style={mainStyle.container}>
                <UserDesc />
                <TopButtons />
                <InfoGroup titles={titles} values={values} />
                <Options />
            </View>
        </ScrollView>
    );
}

const mainStyle = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
    }

});

export default UserProfile;
