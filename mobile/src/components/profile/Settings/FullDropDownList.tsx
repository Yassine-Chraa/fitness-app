import React from 'react';
import { StyleSheet, View } from 'react-native';
import FullDropDown from './FullDropDown';

const values = [
    {key: 'unit system', value: 'inch/lb'},
    {key: 'default reps', value: '5'},
    {key: 'default sets', value: '5'},
]

const times = [
    {key: 'reset timer alarm', value: 'Off'},
    {key: 'rest time (in sec)', value: '60'},
    {key: 'keep logging for 10 min', value: 'off'},
]

const others = [
    {key: 'auto play exercise animation', value: 'Off'},
    {key: 'repair time', value: '00:00'},
]


const FullDropDownList = () => {
   
    return (
        <View style={styles.container}>

            <FullDropDown 
                title="Workout Tracking Pre-fill Values"
                items={values}
            />
            <FullDropDown 
                title="Rest Timer"
                items={times}
            />
            <FullDropDown 
                title="Other Support"
                items={others}
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
