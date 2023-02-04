import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../constants/theme';

const Header = ({name, action, backButton, noAction}: any) => {
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
        <TouchableOpacity><Icon name="arrow-left" size={22} solid color="#000" /></TouchableOpacity>
      ) : null}
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: theme.colors.text,
        }}>
        {name}
      </Text>
      {!noAction ? (
        <TouchableNativeFeedback>
          <Icon name={icon} size={22} solid color="#000" />
        </TouchableNativeFeedback>
      ) : null}
    </View>
  );
};
const Screen = ({
  children,
  name,
  action,
  backButton,
  addButton,
  noAction,
}: any) => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header name={name} action={action} backButton={backButton} noAction />
      {name != 'Restaurant' && name != 'Store' ? (
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : (
        <View style={{flex: 1}}>{children}</View>
      )}
      {addButton ? (
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" color={'#fff'} size={16} />
          <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
            New
          </Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  addButton: {
    zIndex: 2,
    marginLeft: 'auto',
    bottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.primary,
  },
});
export default Screen;
