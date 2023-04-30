import React from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FBReaction = ({ imgUri, title, setIndex, currentIndex, index }: any): JSX.Element => {
    return (
        <TouchableOpacity
            onPress={() => setIndex(index)}
            activeOpacity={0.5}
            style={ReactionStyle.AnswerItem}>
            <Image
                style={ReactionStyle.image}
                source={{ uri: "asset:/images/" + imgUri }}
            />
            <Text style={ReactionStyle.itemText}>{title}</Text>
            {
                currentIndex == index ? <Icon name="check-circle"
                    color={'#0f0'}
                    size={24} style={ReactionStyle.icon} /> : null
            }
        </TouchableOpacity>
    )
}

export default FBReaction

const ReactionStyle = StyleSheet.create({
    AnswerItem: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 12,
        paddingHorizontal: 44,
        margin: 7,
        paddingTop: 18,
        paddingBottom: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#59595966",
    },
    image: {
        height: 70,
        width: 70,
        borderRadius: 4,
    },
    itemText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1976d2',
    },
    icon: {
        position: 'absolute',
        top: 10,
        right: 10,
    }
})