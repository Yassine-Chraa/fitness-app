import React from 'react';
import { StyleSheet, View } from 'react-native';
import Screen from '../../components/Screen';
import UserDesc from '../../components/profile/UserDesc';
import TopButton from '../../components/profile/TopButton';
import InfoGroup from '../../components/profile/InfoGroup';
import Options from '../../components/profile/Options';

function Profile(): JSX.Element {
    
    const titles = ['150', '0.0', '22.14']
    const values = ['weight (Kg)', 'Body fat (%)', 'BMI']
  return (
    <Screen name="Profile" allowScroll>
                  <View style={styles.container}>
                <UserDesc/>
                <TopButton />
                <InfoGroup titles={titles} values={values} />
                <Options />
            </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
    }
});

export default Profile;
