import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';

const Option = ({title, iconName, BadgeColor}: any): JSX.Element => {
  return (
    <TouchableOpacity
      style={{...styles.row, ...styles.container}}>
      <View style={{...styles.row, gap: 12}}>
        <View style={{...styles.iconContainer, backgroundColor: BadgeColor}}>
          <Icon name={iconName} size={18} color={'#fff'} solid />
        </View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <Icon name={'chevron-right'} size={20} color={theme.colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  text: {
    color: theme.colors.text,
    fontSize: 18,
  },
  iconContainer: {
    height: 32,
    width: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
});

export default Option;
