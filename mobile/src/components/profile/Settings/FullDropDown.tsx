import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import theme from '../../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';


const FullDropDown = ({
    title,
}: any): JSX.Element => {

    const [isOpen, setIsOpen] = useState(false);

    const openHandler = () => {
        setIsOpen((prev) => !prev)
    }

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.container}
                onPress={openHandler}
            >
                <Text style={styles.text}>{title}</Text>
                <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <View style={{ display: isOpen ? 'flex' : 'none', ...styles.hiddenList }}>
                <DropDownItem
                    label={"Unit System"}
                    value={"cm/kg"}
                    needInfo={true}
                    textInfo={"bla bla bla"}
                />
                <DropDownItem
                    label={"Unit System"}
                    value={"cm/kg"}
                    needInfo={true}
                    textInfo={"bla bla bla"}
                />
                <DropDownItem
                    label={"Unit System"}
                    value={"cm/kg"}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    text: {
        color: theme.colors.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    hiddenList: {
        backgroundColor: '#eee',
        paddingHorizontal: 6,
    }
});

export default FullDropDown;

const DropDownItem = ({ value, label, needInfo = false, textInfo = '' }: any): JSX.Element => {
    return (
        <TouchableOpacity activeOpacity={0.6} style={ItemStyle.container}>
            <View style={styles.container}>
                <Text style={ItemStyle.label}>{label}</Text>
                {
                    needInfo ? <Icon name={'info-circle'} size={18} color={'#fff'} solid /> : null
                }
            </View>
            <Text style={ItemStyle.value}>{value}</Text>
        </TouchableOpacity>
    );
};

const ItemStyle = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 18,
        marginRight: 10,
    }
})