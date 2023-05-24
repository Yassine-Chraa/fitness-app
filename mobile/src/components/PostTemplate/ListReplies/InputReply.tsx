import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const InputReply = ({ sendReplyHandler }: any) => {
    const [text, setText] = useState('');

    const handleTextChange = (value: any) => {
        setText(value);
    };

    const handleSubmit = () => {
        if (text) {
            sendReplyHandler(text);
            setText('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.textArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a reply..."
                    value={text}
                    onChangeText={handleTextChange}
                    multiline={true}
                />
            </View>
            <TouchableOpacity onPress={handleSubmit}>
                <Icon name="paper-plane" size={15} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
    },
    input: {
        flex: 1,
        maxHeight: 110,
    },
    icon: {
        margin: 5,
        color: '#555',
        backgroundColor: '#eee',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:20,
    },
    textArea:{
        flex: 1,
        marginVertical: 4,
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        paddingLeft: 8,
        paddingRight: 8,
        marginLeft: 45,
    }
});

export default InputReply;
