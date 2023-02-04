import {StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import WebView from "react-native-webview";
import Screen from '../../components/Screen';
const ExerciceDetails = ({route}: any) => {
  const {name} = route.params;
  return (
    <Screen noAction backButton>
        {/*<WebView source={{ uri: 'https://www.youtube.com/watch?v=11gY7Q5D5wo' }}/>*/}
        <Text>{name}</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    height: 400,
    width: 400
  },
});
export default ExerciceDetails;
