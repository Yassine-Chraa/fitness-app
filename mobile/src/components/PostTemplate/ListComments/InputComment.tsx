import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const InputComment = ({ onComment }: any): JSX.Element => {
    const [comment, setComment] = useState('');

    const handleComment = () => {
        if (comment) {
            onComment(comment);
            setComment('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.textArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a comment..."
                    value={comment}
                    onChangeText={setComment}
                    onSubmitEditing={handleComment}
                    multiline={true}
                />
            </View>
            <TouchableOpacity onPress={handleComment} activeOpacity={0.6}>
                <Icon name="paper-plane" size={18} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
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
        borderRadius: 20,
    },
    textArea: {
        flex: 1,
        marginVertical: 4,
        backgroundColor: '#f0f0f0',
        borderRadius: 16,
        paddingLeft: 8,
        paddingRight: 8,
    }
});

export default InputComment;
