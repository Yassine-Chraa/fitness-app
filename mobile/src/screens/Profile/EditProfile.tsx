import {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Screen from '../../components/Screen';
import {Image} from '@rneui/themed';
import theme from '../../constants/theme';
import CustomTextInput from '../../components/authentification/CustomTextInput';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

const EditProfile = ({route, navigation}: any) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const updateProfile = () => {
    navigation.goBack();
  };
  return (
    <Screen
      name={'Edit Profile'}
      backButton
      action="save"
      actionFunction={updateProfile}>
      <View style={styles.heading}>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/men/22.jpg'}}
          style={styles.profileImage}
          resizeMode={'cover'}
        />
        <TouchableOpacity
          activeOpacity={0.4}
          style={{
            position: 'absolute',
            top: -6,
            right: -15,
            backgroundColor: theme.colors.customCard,
            padding: 6,
            borderRadius: 18,
            borderWidth: 4,
            borderColor: '#fff',
          }}>
          <Icon name="camera" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 8, rowGap: 24}}>
        <View style={{marginBottom: -12}}>
          <Text style={styles.subTitle}>Name</Text>
          <CustomTextInput
            customStyle={{
              fontSize: 16,
              backgroundColor: theme.colors.statusBar,
            }}
            placeholder="Name"
            value={'Ben alla Ismail'}
          />
        </View>
        <View>
          <Text style={styles.subTitle}>Gender</Text>
          <View style={styles.toggle}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={{
                ...styles.toggleButton,
                backgroundColor: theme.colors.textInput,
                opacity: 0.5,
              }}>
              <Text style={styles.toggleText}>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.4} style={styles.toggleButton}>
              <Text style={styles.toggleText}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>Birth Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setOpen(true)}>
            <Text
              style={{
                fontSize: 16,
                color: theme.colors.text,
              }}>
              {date.toLocaleDateString()}
            </Text>
            <Icon name="chevron-down" size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <DatePicker
            modal
            locale="en"
            mode="date"
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View>
          <Text style={styles.subTitle}>Current Level</Text>
          <View style={styles.toggle}>
            <TouchableOpacity activeOpacity={0.4} style={styles.toggleButton}>
              <Text style={styles.toggleText}>Beginner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.4}
              style={{
                ...styles.toggleButton,
                backgroundColor: theme.colors.textInput,
                opacity: 0.5,
              }}>
              <Text style={styles.toggleText}>Intermediate</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.4} style={styles.toggleButton}>
              <Text style={styles.toggleText}>Advanced</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>Your Goal</Text>
          <View style={styles.toggle}>
            <TouchableOpacity activeOpacity={0.4} style={styles.toggleButton}>
              <Text style={styles.toggleText}>Maintaining</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.4} style={styles.toggleButton}>
              <Text style={styles.toggleText}>Bulking</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.4}
              style={{
                ...styles.toggleButton,
                backgroundColor: theme.colors.textInput,
                opacity: 0.5,
              }}>
              <Text style={styles.toggleText}>Cutting</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginBottom: 32,
    marginTop: 16,
    alignItems: 'center',
    width: 90,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: theme.colors.statusBar,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: 12,
  },
  subTitle: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: '600',
  },
  toggle: {
    flexDirection: 'row',
    columnGap: 8,
    marginTop: 8,
  },
  toggleButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.textInput,
    borderRadius: 8,
  },
  toggleText: {
    color: theme.colors.text,
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderColor: theme.colors.statusBar,
    borderWidth: 1,
  },
});
export default EditProfile;
