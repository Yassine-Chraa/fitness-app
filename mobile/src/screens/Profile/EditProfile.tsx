import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import Screen from '../../components/Screen';
import { Image } from '@rneui/themed';
import theme from '../../constants/theme';
import CustomTextInput from '../../components/authentification/CustomTextInput';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAuth } from '../../context/providers/AuthContextProvider';
import UserType from '../../types/UserType';
import FAImagePicker from '../../components/FAImageHandlers/FAImagePicker';

const EditProfile = ({ navigation }: any): JSX.Element => {
  const { currentUser, updateCurrentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserType | any>(currentUser?.user);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [profile, setImageURL] = useState('');

  const updateProfile = async () => {
    const res = await updateCurrentUser(user)
    if (res) navigation.goBack();
    else Alert.alert('ERROR', 'Ooops! something went wrong !', [
      { text: 'Close' },
    ]);
  };

  useEffect(() => {
    if (profile != '') {
      setUser((prev: UserType) => ({ ...prev, profile }))
    }
  }, [profile])


  return (
    <Screen
      name={'Edit Profile'}
      backButton
      allowScroll
      action="save"
      actionFunction={updateProfile}>

      <FAImagePicker setIsVisible={setIsVisible}
        isVisible={isVisible}
        setCurrentImageUrl={setCurrentImageUrl}
        setImageURL={setImageURL} />

      <View style={styles.heading}>
        <Image
          source={{ uri: user.profile }}
          style={styles.profileImage}
          resizeMode={'cover'}
        />

        <TouchableOpacity
          activeOpacity={0.4}
          style={{
            position: 'absolute',
            bottom: 4,
            right: -6,
            backgroundColor: theme.colors.buttonBackground,
            padding: 6,
            borderRadius: 18,
            borderWidth: 2,
            borderColor: '#fff',
          }}
          onPress={() => setIsVisible(() => true)}
        >
          <Icon name="camera" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 8, marginBottom: 16, rowGap: 10 }}>

        <View style={{ marginBottom: -12 }}>
          <Text style={styles.subTitle}>Name</Text>
          <CustomTextInput
            customStyle={{
              fontSize: 16,
              backgroundColor: theme.colors.statusBar,
            }}
            placeholder="Name"
            value={user ? user.name : ''}
            onChangeText={(val: string) => setUser((prev: any) => {
              return { ...prev, name: val }
            })}
          />
        </View>

        {/* =============================================================================== */}

        <View style={{ marginBottom: -12 }}>
          <Text style={styles.subTitle}>Email Address</Text>
          <CustomTextInput
            customStyle={{
              fontSize: 16,
              backgroundColor: theme.colors.statusBar,
            }}
            placeholder="Email"
            value={user ? user.email : ''}
            onChangeText={(val: string) => setUser((prev: any) => {
              return { ...prev, email: val }
            })}
          />
        </View>

        {/* =============================================================================== */}

        <Text style={styles.subTitle}>Gender</Text>
        <View style={styles.section}>
          {['male', 'female'].map((gender: string, index: number) => {
            return (<TouchableOpacity key={index}
              activeOpacity={0.4}
              style={{
                ...styles.sectionButton,
                backgroundColor: user?.gender === gender ? theme.colors.buttonBackground : theme.colors.background,

              }} onPress={() => setUser((prev: UserType) => {
                return { ...prev, gender: gender }
              })}>
              <Text style={{ ...styles.sectionText, color: user?.gender === gender ? '#fff' : theme.colors.text }}>{gender.toUpperCase()}</Text>
            </TouchableOpacity>)
          })}
        </View>


        {/* =============================================================================== */}

        <Text style={styles.subTitle}>Birth Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setOpen(true)}>
          <Text
            style={{
              fontSize: 16,
              color: theme.colors.text,
            }}>
            {new Date(user?.birth_date).toLocaleDateString()}
          </Text>
          <Icon name="chevron-down" size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <DatePicker
          modal locale="en" mode="date" open={open}
          date={new Date(user?.birth_date)}
          onConfirm={date => {
            setOpen(false);
            setUser((prev: UserType) => {
              return { ...prev, birth_date: date }
            });
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />

        {/* =============================================================================== */}

        <Text style={styles.subTitle}>Current Level</Text>
        <View style={styles.section}>
          {['beginner', 'intermediate', 'advanced'].map((level: string, index: number) => {
            return (<TouchableOpacity key={index}
              activeOpacity={0.4}
              style={{
                ...styles.sectionButton,
                backgroundColor: user?.workout_level === level ? theme.colors.buttonBackground : theme.colors.background,

              }} onPress={() => setUser((prev: UserType) => {
                return { ...prev, workout_level: level }
              })}>
              <Text style={{ ...styles.sectionText, color: user?.workout_level === level ? '#fff' : theme.colors.text }}>{level.toUpperCase()}</Text>
            </TouchableOpacity>)
          })}
        </View>

        {/* =============================================================================== */}

        <Text style={styles.subTitle}>Your Goal</Text>
        <View style={styles.section}>
          {['maintaining', 'bulking', 'cutting'].map((top_goal: string, index: number) => {
            return (<TouchableOpacity key={index}
              activeOpacity={0.4}
              style={{
                ...styles.sectionButton,
                backgroundColor: user?.top_goal === top_goal ? theme.colors.buttonBackground : theme.colors.background,

              }} onPress={() => setUser((prev: UserType) => {
                return { ...prev, top_goal: top_goal }
              })}>
              <Text style={{ ...styles.sectionText, color: user?.top_goal === top_goal ? '#fff' : theme.colors.text }}>{top_goal.toUpperCase()}</Text>
            </TouchableOpacity>)
          })}
        </View>

        {/* =============================================================================== */}

        <View style={{ marginBottom: -12 }}>
          <Text style={styles.subTitle}>About You</Text>
          <CustomTextInput
            multiline={true}
            customStyle={{
              fontSize: 16,
              backgroundColor: theme.colors.statusBar,
            }}
            placeholder="write a short description about yourself..."
            value={user ? user.bio : ''}
            onChangeText={(val: string) => setUser((prev: any) => {
              return { ...prev, bio: val }
            })}
          />
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
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#0006",
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
  section: {
    flexDirection: 'row',
    columnGap: 8,
    marginTop: 2,
  },
  sectionButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#0006',
    borderRadius: 8,
  },
  sectionText: {
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