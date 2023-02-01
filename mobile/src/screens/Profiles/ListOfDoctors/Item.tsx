import { Avatar } from '@rneui/themed';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const Item = ():JSX.Element => {
    return (
        <View>
            <View>
                <Avatar />
            </View>
        </View>
    )
}

export default Item;

const styles = StyleSheet.create({
    constainer:{

    }
});
