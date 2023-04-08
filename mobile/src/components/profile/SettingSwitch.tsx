import { TouchableOpacity, Text, StyleSheet, View, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import appInfo from '../../../app.json';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { Switch } from '@rneui/base';
import { useState } from 'react';
const SettingSwitch = ({
    title,
    type,
    BadgeColor,
}: any): JSX.Element => {
    const navigation: any = useNavigation();
    const [isSet, setIsSet] = useState(false);
    const modeChanger = () => {
        setIsSet((prev) => !prev);
    }

    return (
        <View
            style={{ ...styles.row, ...styles.container }}
        >
            <View style={{ ...styles.row, gap: 12 }}>
                <View style={{ ...styles.iconContainer, backgroundColor: BadgeColor }}>
                    {
                        type == 'dark' ? <Icon name={isSet ? 'moon' : 'sun'} size={18} color={'#fff'} solid />
                            : <Icon name={'redo'} size={18} color={'#fff'} solid />
                    }
                </View>
                <Text style={styles.text}>{title}</Text>
            </View>
            <Switch value={isSet} onChange={modeChanger} />
        </View>
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
    iconContainer: {
        height: 32,
        width: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },
});

export default SettingSwitch;
