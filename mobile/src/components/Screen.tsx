import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../constants/theme';

const Header = ({name, action, backButton}: any) => {
  let icon;
  switch (action) {
    case 'search':
      icon = 'search';
      break;
    default:
      icon = 'bell';
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
      {backButton ? (
        <Icon name="arrow-left" size={22} solid color="#000" />
      ) : null}
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: theme.colors.text,
        }}>
        {name}
      </Text>
      <TouchableNativeFeedback>
        <Icon name={icon} size={22} solid color="#000" />
      </TouchableNativeFeedback>
    </View>
  );
};
const Screen = ({children, name, action, backButton}: any) => {
  if (name != 'Restaurant' && name != 'Store') {
    return (
      <SafeAreaView style={styles.screen}>
        <Header name={name} action={action} backButton={backButton} />
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.screen}>
        <Header name={name} action={action} backButton={backButton} />
        <View style={{flex: 1}}>{children}</View>
      </SafeAreaView>
    );
  }
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
});
export default Screen;
