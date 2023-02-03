import React from 'react';
import { StyleSheet,Button,View } from 'react-native';

export default function CustomButton({ mode, style, ...props }: any):JSX.Element {
  return (
    <View style={styles.button}>
      <Button
      style={styles.text}
      mode={mode}
      {...props}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
})
