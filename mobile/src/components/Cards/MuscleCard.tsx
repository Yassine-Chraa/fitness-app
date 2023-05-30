import { Image } from '@rneui/themed';
import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import images from '../../constants/Images';

const MuscleCard = ({ item }: any) => {
    const navigation: any = useNavigation();
    return (
        <TouchableOpacity
            style={styles.itemContainer}
            activeOpacity={0.5}
            onPress={() =>
                navigation.navigate('MuscleExercices', {
                    muscle: item,
                })
            }>
            <View
                style={{
                    flexDirection: 'row',
                    columnGap: 12,
                    alignItems: 'center'
                }}>
                <Image
                    source={images[item]}
                    style={styles.image}
                    resizeMode='contain'
                    resizeMethod='auto'
                    PlaceholderContent={<ActivityIndicator />}
                />
                <Text
                    style={{
                        color: theme.colors.text,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                    }}>
                    {item}
                </Text>
            </View>
            <TouchableOpacity style={{ alignSelf: 'center' }} activeOpacity={0.4}>
                <Icon name="chevron-right" size={20} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 2,
    },
    image: {
        height: 54, width: 54, borderRadius: 27,
        borderWidth: 1,
        borderColor: '#0002',
        margin: 2,
    }
});
export default MuscleCard;
