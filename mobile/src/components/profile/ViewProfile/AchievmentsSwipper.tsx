import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Image, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AchievmentsSwipper = ({ badgets, imageStyle, title }: any): JSX.Element => {
    const navigation: any = useNavigation();

    return (
        <View style={styles.littleSwipperContainer}>
            <TouchableOpacity activeOpacity={0.5} style={styles.littleSwipperHeader}
                onPress={() => navigation.navigate('AchievmentsGallery', { badgets: badgets })}>
                <Text>{title}</Text>
                <Icon name={'chevron-right'} size={14} />
            </TouchableOpacity>

            <ScrollView horizontal={true} contentContainerStyle={styles.swipper}>
                {badgets.map((image: any, index: any) => {
                    return (
                        <TouchableOpacity activeOpacity={0.6} key={index} style={styles.imageContainer}>
                            <Image source={image.image} style={{ ...styles.ScrollImage, ...imageStyle }} />
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default AchievmentsSwipper;

const styles = StyleSheet.create({
    imageContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ScrollImage: {
        width: 40,
        height:40,
        margin: 5,
        borderRadius:25,
        borderWidth: 2,
        borderColor:'blue',
        backgroundColor: '#000d',
    },
    littleSwipperContainer: {
        marginVertical: 10,
    },
    littleSwipperHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 8
    },
    swipper: {
        paddingVertical: 5,
    }
})