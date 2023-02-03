import { Divider } from '@rneui/themed';
import React from 'react';
import {
    StyleSheet, ScrollView, View
} from 'react-native';
import Header from './Header';
import InfoGroup from './InfoGroup';
import MoreOptions from './MoreOptions';
import NewsButton from './NewsButton';
import PictureGrid from './PictureGrid';
import TopButtons from './TopButtons';


function UserProfile(): JSX.Element {

    const titles = ['150', '0.0', '22.14']
    const values = ['weight LBS', 'Body fat %', 'BMI']

    return (
        <ScrollView>
            <View style={mainStyle.container}>
                <Header />
                <TopButtons />
                <PictureGrid />
                <InfoGroup titles={titles} values={values} />
                <NewsButton title="Big Title here" indicator='indication here' />
                <NewsButton title="Big Title here" indicator='indication here' />
                <Divider color={'gray'} width={4} style={{ marginVertical: 3 }} />
                <MoreOptions />
                <Divider color={'white'} width={30} style={{ marginVertical: 3 }} />
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
