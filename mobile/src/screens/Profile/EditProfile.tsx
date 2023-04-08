import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import Screen from '../../components/Screen';
import { Image } from '@rneui/themed';
import theme from '../../constants/theme';
import CustomTextInput from '../../components/authentification/CustomTextInput';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../context/providers/AuthContextProvider';

const EditProfile = ({ navigation }: any) => {
  const { currentUser, updateCurrentUser } = useAuth();
  const [form, setForm] = useState(currentUser?.user);
  const [open, setOpen] = useState(false);
  const upload = async () => {

  }
  const updateProfile = async () => {
    const res = await updateCurrentUser(form)
    if (res) navigation.goBack();
    else Alert.alert('ERROR', 'Ooops! something went wrong !', [
      { text: 'Close' },
    ]);
  };
  return (
    <Screen
      name={'Edit Profile'}
      backButton
      action="save"
      actionFunction={updateProfile}>
      <View style={styles.heading}>
        <Image
          source={{ uri: form?.profile! }}
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
          }}
          onPress={() => upload()}
        >
          <Icon name="camera" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 8, rowGap: 24 }}>
        <View style={{ marginBottom: -12 }}>
          <Text style={styles.subTitle}>Name</Text>
          <CustomTextInput
            customStyle={{
              fontSize: 16,
              backgroundColor: theme.colors.statusBar,
            }}
            placeholder="Name"
            value={form?.name}
          />
        </View>
        <View>
          <Text style={styles.subTitle}>Gender</Text>
          <View style={styles.toggle}>
            {['male', 'female'].map((gender: string, index: number) => {
              return (<TouchableOpacity key={index}
                activeOpacity={0.4}
                style={{
                  ...styles.toggleButton,
                  backgroundColor: form?.gender === gender ? theme.colors.button : theme.colors.background,

                }} onPress={() => setForm((prev: any) => {
                  return { ...prev, gender: gender }
                })}>
                <Text style={{ ...styles.toggleText, color: form?.gender === gender ? '#fff' : theme.colors.text }}>{gender.toUpperCase()}</Text>
              </TouchableOpacity>)
            })}
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
              {new Date(form?.birth_date).toLocaleDateString()}
            </Text>
            <Icon name="chevron-down" size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <DatePicker
            modal
            locale="en"
            mode="date"
            open={open}
            date={new Date(form?.birth_date)}
            onConfirm={date => {
              setOpen(false);
              setForm((prev: any) => {
                return { ...prev, birth_date: date }
              });
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View>
          <Text style={styles.subTitle}>Current Level</Text>
          <View style={styles.toggle}>
            {['beginner', 'intermediate', 'advanced'].map((level: string, index: number) => {
              return (<TouchableOpacity key={index}
                activeOpacity={0.4}
                style={{
                  ...styles.toggleButton,
                  backgroundColor: form?.workout_level === level ? theme.colors.button : theme.colors.background,

                }} onPress={() => setForm((prev: any) => {
                  return { ...prev, workout_level: level }
                })}>
                <Text style={{ ...styles.toggleText, color: form?.workout_level === level ? '#fff' : theme.colors.text }}>{level.toUpperCase()}</Text>
              </TouchableOpacity>)
            })}
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>Your Goal</Text>
          <View style={styles.toggle}>
          {['maintaining', 'bulking', 'cutting'].map((top_goal: string, index: number) => {
              return (<TouchableOpacity key={index}
                activeOpacity={0.4}
                style={{
                  ...styles.toggleButton,
                  backgroundColor: form?.top_goal === top_goal ? theme.colors.button : theme.colors.background,

                }} onPress={() => setForm((prev: any) => {
                  return { ...prev, top_goal: top_goal }
                })}>
                <Text style={{ ...styles.toggleText, color: form?.top_goal === top_goal ? '#fff' : theme.colors.text }}>{top_goal.toUpperCase()}</Text>
              </TouchableOpacity>)
            })}
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
