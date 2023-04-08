import React from 'react';
import { StyleSheet, View } from 'react-native';
import FullDropDown from './FullDropDown';

const FullDropDownList = () => {
    return (
        <View style={styles.container}>

            <FullDropDown 
                title="Workout Tracking Pre-fill Values"
            />
            <FullDropDown 
                title="Rest Timer"
            />
            <FullDropDown 
                title="Exercise Images"
            />
            <FullDropDown 
                title="Other Support"
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        marginTop: 5,
    },
});

export default FullDropDownList;
