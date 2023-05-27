import { TouchableOpacity, Text, StyleSheet, View, Share, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Switch } from '@rneui/base';
import React, { useState } from 'react';
import theme from '../../../../constants/theme';
const MWRswitch = ({
    title,
}: any): JSX.Element => {
    const navigation: any = useNavigation();
    const [isSet, setIsSet] = useState(false);
    const modeChanger = () => {
        setIsSet((prev) => !prev);
    }



    return (
        <TouchableOpacity activeOpacity={0.8} onPress={modeChanger}
            style={{ ...styles.row, ...styles.container }}
        >
            <View style={{ ...styles.row, gap: 12 }}>
                <Text style={styles.text}>{title}</Text>
            </View>
            <Switch
                trackColor={{ true: '#1A73E8', false: 'grey' }}
                thumbColor={(isSet ? '#1A73ff' : 'grey')}
                value={isSet}
                onChange={modeChanger} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    text: {
        color: theme.colors.text,
        fontSize: 18,
    },
});

export default MWRswitch;
