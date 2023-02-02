import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Button } from 'react-native';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../../../constants/theme';
import { nameValidator } from '../../../Helpers/nameValidator';

const UserNameModal = ({ setIsUserNameModalOpen, isUserNameModalOpen, setName }: any): JSX.Element => {
    const [localName, setLocalName] = useState({ value: '', error: '' });
    const description = "Your user name should not contain";

    const valueChangeHandler = () => {
        const nameError = nameValidator(localName.value);
        setLocalName((prev: any) => ({ ...prev, error: nameError }));
        if (nameError == '') {
            setName((prev: any) => localName);
            setIsUserNameModalOpen(false);
            setLocalName({ value: '', error: '' })
        }
    }

    return (

        <Modal isVisible={isUserNameModalOpen}
            customBackdrop={
                <TouchableWithoutFeedback onPress={() => setIsUserNameModalOpen(false)}>
                    <View style={modalStyle.modalContainer} />
                </TouchableWithoutFeedback>
            }
        >
            <View style={modalStyle.container}>
                <View style={modalStyle.inputContainer}>
                    <TextInput
                        style={modalStyle.input}
                        selectionColor={theme.colors.primary}
                        underlineColorAndroid='transparent'
                        placeholder="Your Name"
                        
                        onChangeText={(val: string) => setLocalName({ value: val, error: '' })}
                        autoCapitalize="none"
                        autoComplete='name'
                        textContentType='name'
                        keyboardType="default" />

                    {description && !localName.error ? (<Text style={modalStyle.description}>{description}</Text>) : null}
                    {localName.error ? <Text style={modalStyle.inputError}>{localName.error}</Text> : null}
                    <View style={modalStyle.button}>
                        <Button title='Done' onPress={valueChangeHandler} />
                    </View>
                </View>
            </View>
        </Modal>

    );
};

export default UserNameModal;

const modalStyle = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#0007',
    },
    container: {
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
    }
});