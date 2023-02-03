import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const Option = ({title, iconName}:any): JSX.Element => {
    return (
        <TouchableOpacity activeOpacity={0.7} style={optionStyle.container}>
            <Icon name={iconName} size={16} color={'white'} />
            <Text style={optionStyle.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const optionStyle = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#222',
        padding: 12
    },
    text: {
        color: '#fff',
        marginStart: 10,
    }

})

const MoreOptions = () => {
    return (
        <View style={styles.container}>
            <Option title="Coaches" iconName="chalkboard-teacher"/>
            <Option title="Doctors" iconName="stethoscope"/>
            <Option title="Products" iconName="shopping-cart"/>
            <Option title="Activities" iconName="running"/>
            <Option title="Settings" iconName="wrench"/>
            <Option title="FeedBack" iconName="comment-dollar"/>
            <Option title="Share" iconName="share"/>
            <Option title="Notifications" iconName="notifications"/>
        </View>
    )
}

export default MoreOptions;

const styles = StyleSheet.create({
    container: {
        borderRadius: 5
    }
});

