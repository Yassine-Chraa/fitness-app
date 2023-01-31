import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SlidesStyles } from './SlidesStyles';

export const renderItem = ({ item }: any):JSX.Element => {
    return (
        <View
            style={[
                SlidesStyles.slide,
                {
                    backgroundColor: item.bg,
                },
            ]}>
            <Text style={SlidesStyles.title}>{item.title}</Text>
            <Image source={item.image} style={SlidesStyles.image} />
            <Text style={SlidesStyles.text}>{item.text}</Text>
        </View>
    );
};

export const renderNextButton = ():JSX.Element  => {
    return (
        <View style={SlidesStyles.buttonCircle}>
            <Icon name="arrow-right" color="rgba(255, 255, 255, .9)" size={24} />
        </View>
    );
};

export const renderDoneButton = ():JSX.Element  => {
    return (
        <View style={SlidesStyles.buttonCircle}>
            <Icon name="check" color="rgba(255, 255, 255, .9)" size={24} />
        </View>
    );
};