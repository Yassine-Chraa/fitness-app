import {View,StyleSheet} from 'react-native';
const Screen = ({children}: any) => {
  return <View style={styles.screen}>{children}</View>;
};
const styles = StyleSheet.create({
    screen:{
        paddingHorizontal: 16,
        paddingTop: 16
    }
})
export default Screen;