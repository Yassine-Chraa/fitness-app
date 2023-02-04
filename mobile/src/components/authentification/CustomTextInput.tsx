import React from 'react'
import { View, StyleSheet, Text,TextInput } from 'react-native'
import theme from '../../constants/theme'

export default function CustomTextInput({ errorText, description, ...props }: any): JSX.Element {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} selectionColor={theme.colors.primary} underlineColorAndroid='transparent' {...props}/>
            {description && !errorText ? (<Text style={styles.description}>{description}</Text>) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    input: {
        backgroundColor: '#DDDDDD',
        borderRadius: 8,
        paddingHorizontal: 12
    },
    description: {
        fontSize: 13,
        color: theme.colors.text,
        paddingTop: 8,
    },
    error: {
        fontSize: 13,
        color: 'red',
        paddingTop: 8,
    },
})