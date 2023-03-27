import { Image } from '@rneui/themed';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';

const CoachProfile = ({ navigation, route }: any) => {
  const { item } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Image
            source={{ uri: 'https://placehold.jp/400x500.png' }}
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
                    data={[1, 2, 3]}
                    renderItem={({ item }) => {
                      return (
                        <View key={item} style={{ marginRight: 8 }}>
                          <Image
                            source={{ uri: 'https://placehold.jp/180x260.png' }}
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
          <Icon name="arrow-left" size={22} color={theme.colors.text} />
        </TouchableOpacity>
      </ScrollView>
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
});
export default CoachProfile;
