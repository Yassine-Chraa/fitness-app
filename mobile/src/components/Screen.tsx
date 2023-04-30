import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import theme from '../constants/theme';

const Header = ({ name, action, actionFunction, backButton, noAction }: any) => {
  const navigation = useNavigation();

  let icon;
  if (action != 'save') {
    icon = action;
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} solid color="#000" />
        </TouchableOpacity>
      ) : null}
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: theme.colors.text,
          marginRight: noAction ? 20 : 0,
        }}>
        {name}
      </Text>
      {!noAction ? (
        <TouchableOpacity activeOpacity={0.4} onPress={actionFunction}>
          {action == 'save' ? (
            <Text
              style={{
                fontWeight: 'bold',
                color: theme.colors.primary,
                fontSize: 18,
              }}>
              Save
            </Text>
          ) : (
            <Icon name={icon} size={22} solid color="#000" />
          )}
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};
const Screen = ({
  children,
  name,
  action,
  actionFunction,
  backButton,
  actionButton,
  actionButtonType,
  noAction,
  allowScroll,
}: any) => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header
        name={name}
        action={action}
        actionFunction={actionFunction}
        backButton={backButton}
        noAction={noAction}
      />
      {allowScroll ? (
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : (
        <View style={{ flex: 1 }}>{children}</View>
      )}
      {actionButton ? (
        <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            {actionButtonType}
          </Text>
        </TouchableOpacity>
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  addButton: {
    zIndex: 2,
    marginLeft: 'auto',
    bottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.primary,
  },
});
export default Screen;
