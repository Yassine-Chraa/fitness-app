import { Avatar } from '@rneui/themed';
import React from 'react';
import {
    StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


function Header(): JSX.Element {
    return (
        <View
            style={styles.profile}>
            <View style={styles.avatarName}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        size={70}
                        rounded
                        source={{ uri: 'https://randomuser.me/api/portraits/women/57.jpg' }}
                        title="test"
                        containerStyle={{ backgroundColor: 'grey' }}
                    >
                    </Avatar>
                    <TouchableOpacity>
                        <Icon name={'user'} size={22} solid
                            style={styles.avatarIcon} />
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', }}>
                    <Text style={styles.name}>Ben alla Ismail</Text>
                    <Text style={styles.subtitle}>beginer</Text>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.4}>
                    <Icon name={'chevron-right'} size={22} solid style={styles.chevron} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ddd',
        padding: 4,
        borderRadius: 5,
    },
    avatarName: {
        alignSelf: 'center',
        flexDirection: 'row',

    },
    avatarContainer: {
        position: 'relative',
        alignSelf: 'baseline',
        marginEnd: 14
    },
    avatarIcon: {
        position: 'absolute',
        right: 1,
        bottom: 1,
        zIndex: 2,
        backgroundColor: 'white',
        padding: 3,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 15,
        textAlign: 'center',
        width: 30,
        height: 30,
    },
    name: {
        fontSize: 20,
        color: '#111',
        textTransform: 'uppercase',

    },
    subtitle: {
        fontSize: 14,
    },
    chevron: {
        color: '#000',
        paddingHorizontal: 3,
    }

});

export default Header;
