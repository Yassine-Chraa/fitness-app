import { Image } from '@rneui/themed';
import React from 'react';
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

const MuscleCard = ({ item }: any) => {
    const navigation: any = useNavigation();
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.5}
            onPress={() =>
                navigation.navigate('MuscleExercices', {
                    muscle: item.name,
                })
            }>
            <View
                style={{
                    flexDirection: 'row',
                    columnGap: 12,
                    alignItems: 'center'
                }}>
                <Image
                    source={{ uri: 'https://placehold.jp/115x115.png' }}
                    style={{ height: 50, width: 50, borderRadius: 25 }}
                    PlaceholderContent={<ActivityIndicator />}
                />
                <Text
                    style={{
                        color: theme.colors.text,
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>
                    {item.name}
                </Text>
            </View>
            <TouchableOpacity style={{ alignSelf: 'center' }} activeOpacity={0.4}>
                <Icon name="chevron-right" size={20} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 4,
        marginVertical: 8,
        borderBottomWidth: 0.6,
        borderBottomColor: '#0000003d'
    },
    tag: {
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        backgroundColor: theme.colors.statusBar,
    },
});
export default MuscleCard;
