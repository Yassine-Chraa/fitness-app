import React from 'react'
import { View, StyleSheet, Text,TextInput } from 'react-native'
import theme from '../../constants/theme'

export default function CustomTextInput({ errorText, description,customStyle, ...props }: any): JSX.Element {
    return (
        <View style={styles.container}>
            <TextInput style={{...styles.input,...customStyle}} selectionColor={theme.colors.text} underlineColorAndroid='transparent' {...props}/>
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
        backgroundColor: theme.colors.textInput,
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