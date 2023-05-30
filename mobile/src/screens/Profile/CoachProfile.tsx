import { Image } from '@rneui/themed';
import React,{useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { useImages } from '../../context/providers/ImagesContextProvider';
import Toast from 'react-native-toast-message';

const allowedUsers = ['vip', 'admin'];
const CoachProfile = ({ navigation, route }: any) => {
  const { currentUser } = useAuth()
  const { getCoachImages,images } = useImages()
  const { item } = route.params;

  const connect = async () => {
    if (allowedUsers.includes(currentUser!.user.role)) {
      Toast.show({
        type: 'success',
        text1: 'You are successfully connected to the coach',
    })
    } else {
      Alert.alert('You must become a Vip User')
    }
  }

  const loadImages = async () => {
    await getCoachImages(currentUser.user.id);
  }


  useEffect(() => {
    loadImages();
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Image
            source={{ uri: 'https://img.freepik.com/premium-photo/gym-equipments-fitness-club_23-2147949744.jpg' }}
            style={{
              height: 250,
            }}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode={'cover'}
          />
          <View style={styles.details}>
            <View style={styles.heading}>
              <Image
                source={{ uri: item.profile }}
                style={styles.profileImage}
                resizeMode={'cover'}
              />
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={{ gap: 24 }}>
              <View>
                <Text style={styles.subtitle}>Specializations</Text>
                <View
                  style={{ flexDirection: 'row', columnGap: 10, marginTop: 4 }}>
                  <View style={styles.badge}>
                    <Text style={{ fontSize: 13 }}>Body Building</Text>
                  </View>
                  <View style={styles.badge}>
                    <Text style={{ fontSize: 13 }}>General Fitness</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.subtitle}>Certifications</Text>
                <View
                  style={{ flexDirection: 'row', columnGap: 10, marginTop: 4 }}>
                  <View
                    style={{
                      ...styles.badge,
                      backgroundColor: theme.colors.secondary,
                    }}>
                    <Text style={{ fontSize: 13, color: '#fff' }}>NASM CPT</Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.subtitle}>About</Text>
                <Text style={{ fontSize: 15, color: theme.colors.text }}>
                  {item.bio}
                </Text>
              </View>
              <View>
                <Text style={styles.subtitle}>Progress photos</Text>
                <View
                  style={{ flexDirection: 'row', columnGap: 10, marginTop: 4 }}>
                  <FlatList
                    data={images}
                    renderItem={({ item }) => {
                      return (
                        <View key={item.img_url} style={{ marginRight: 8 }}>
                          <Image
                            source={{ uri: item.img_url }}
                            style={{
                              height: 80,
                              width: 80,
                              borderRadius: 6,
                            }}
                            PlaceholderContent={<ActivityIndicator />}
                            resizeMode={'cover'}
                          />
                        </View>
                      );
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item: any) => item}
                    style={{ marginTop: 4 }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity activeOpacity={0.4} style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color={'#fff'} />
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={connect}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
          Connect
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 5,
    position: 'absolute',
    top: 10,
    left: 8,
  },
  details: {
    paddingHorizontal: 24,
    marginBottom: 48,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: theme.colors.background,
    top: -32,
  },
  heading: {
    marginBottom: 32,
    alignItems: 'center',
    marginTop: -60,
  },
  profileImage: {
    width: 120,
    height: 120,
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
  subtitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  badge: {
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: theme.colors.statusBar,
  },
  addButton: {
    zIndex: 2,
    marginLeft: 'auto',
    bottom: 10,
    right: 4,
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.primary,
  },
});
export default CoachProfile;
