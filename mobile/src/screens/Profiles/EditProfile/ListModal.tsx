import React, { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, Button, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../../constants/theme';

const ListModal = ({ setIsListModalOpen, isListModalOpen, setItem, item, items }: any): JSX.Element => {
    const [itemIndex, setItemIndex] = useState(item.value);
    const [isFocus, setIsFocus] = useState(false);

    const valueChangeHandler = () => {
        setItem((prev: any) => items.filter((el: any) => el.value == itemIndex)[0]);
        setIsListModalOpen(false);
    }

    return (

        <Modal isVisible={isListModalOpen}
            customBackdrop={
                <TouchableWithoutFeedback onPress={() => setIsListModalOpen(false)}>
                    <View style={modalStyle.modalContainer} />
                </TouchableWithoutFeedback>
            }
        >

            <View style={modalStyle.container1}>
                <View style={modalStyle.inputContainer}>
                    <Dropdown
                        style={[modalStyle.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={modalStyle.placeholderStyle}
                        selectedTextStyle={modalStyle.selectedTextStyle}
                        inputSearchStyle={modalStyle.inputSearchStyle}
                        iconStyle={modalStyle.iconStyle}
                        data={items}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select "Type here"' : '...'}
                        searchPlaceholder="Search..."
                        value={itemIndex}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={el => {
                            setItemIndex(el.value);
                            setIsFocus(false);
                        }}
                    />
                </View>
                <View style={modalStyle.button}>
                    <Button title='Done' onPress={valueChangeHandler} />
                </View>
            </View>
        </Modal>

    );
};

export default ListModal;

const modalStyle = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#0007',
    },
    container1: {
        height: 300,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 13
    },
    inputContainer: {
        width: '100%',
        marginVertical: 12,
    },
    input: {
        backgroundColor: theme.colors.primaryContainer,
        borderRadius: 8,
        paddingHorizontal: 12
    },
    description: {
        fontSize: 13,
        color: theme.colors.secondary,
        paddingTop: 8,
    },
    inputError: {
        fontSize: 13,
        color: theme.colors.error,
        paddingTop: 8,
    },
    button: {
        width: 150,
        alignSelf: 'center',
        marginTop: 30,
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});