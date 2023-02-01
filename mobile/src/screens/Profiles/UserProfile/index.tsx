import React from 'react';
import {
    StyleSheet
} from 'react-native';
import Header from './Header';
import InfoGroup from './InfoGroup';
import PictureGrid from './PictureGrid';
import TopButtons from './TopButtons';


function UserProfile(): JSX.Element {
    return (
        <>
            <Header />
            <TopButtons/>
            <PictureGrid/>
            <InfoGroup/>
        </>
    );
}

const styles = StyleSheet.create({});

export default UserProfile;
