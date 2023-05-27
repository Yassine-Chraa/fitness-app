import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'


const ImageClassifier = (): JSX.Element => {
    // const [result, setResult] = useState();
    // const [image, setImage] = useState(require('./assets/apple.jpg'));


    return (
        <View style={styles.container}>
            {/* <Image source={image} style={styles.image} />
            <Text style={styles.results}>
                {result}
            </Text> */}
        </View>
    )
}

export default ImageClassifier


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    results: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    image: {
        width: 150,
        height: 100
    },
});