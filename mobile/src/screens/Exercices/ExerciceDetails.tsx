import {Image} from '@rneui/themed';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomTextInput from '../../components/authentification/CustomTextInput';
import theme from '../../constants/theme';

const ExerciceDetails = ({navigation, route}: any) => {
  const width = Dimensions.get('screen').width - 24;
  const {name, type} = route.params;
  const equipements = [
    {
      id: 1,
      name: 'Barbell',
    },
    {
      id: 2,
      name: 'Bench Press',
    },
  ];
  const steps = [
    {
      id: 1,
      content:
        'Start off setting up your incline bench to a 45-degree angle or use a pre-designed incline bench press bench.',
      img: 'https://placehold.jp/400x300.png',
    },
    {
      id: 2,
      content:
        'Then lie flat on your back on the bench with your feet firmly planted on the floor gripping the barbell with aslightky wider than shoulder-width apart.',
      img: 'https://placehold.jp/400x300.png',
    },
  ];
  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <Swiper height={300} loop={false}>
          <Image
            source={{uri: 'https://placehold.jp/400x300.png'}}
            style={{
              height: 300,
              zIndex: 1,
            }}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode={'cover'}
          />
          <Image
            source={{uri: 'https://placehold.jp/400x400.png'}}
            style={{
              height: 300,
              zIndex: 1,
            }}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode={'cover'}
          />
          <Image
            source={{uri: 'https://placehold.jp/400x400.png'}}
            style={{
              height: 300,
              zIndex: 1,
            }}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode={'cover'}
          />
        </Swiper>

        <View style={styles.details}>
          <TouchableWithoutFeedback>
            <View style={styles.playButton}>
              <Icon name="play" size={20} color={'#fff'} />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.heading}>
            <Text style={styles.title}>{name}</Text>
          </View>
          <View style={{...styles.row, marginBottom: 24}}>
            <View style={styles.tag}>
              <Text>Chest</Text>
            </View>
            <View style={styles.tag}>
              <Text>Triceps</Text>
            </View>
            <View style={styles.tag}>
              <Text>Shoulders</Text>
            </View>
          </View>
          {type !== 'workout' ? (
            <View style={{...styles.row, marginBottom: 24}}>
              <View style={{width: width / 3 - 1}}>
                <CustomTextInput
                  placeholder="Sets"
                  variant={theme.colors.danger}
                  keyboardType="numeric"
                />
              </View>
              <View style={{width: width / 3 - 10}}>
                <CustomTextInput placeholder="Reps" keyboardType="numeric" />
              </View>
              <View style={{width: width / 3 - 10}}>
                <CustomTextInput placeholder="Poid" keyboardType="numeric" />
              </View>
              <View style={{width: width, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.addButton}>
                  <Text
                    style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                    ADD TO PROGRAM
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          <View style={{marginBottom: 24}}>
            <Text style={styles.subtitle}>Equipement</Text>
            <FlatList
              data={equipements}
              renderItem={({item}) => {
                return (
                  <View key={item.id} style={{marginRight: 8}}>
                    <Image
                      source={{uri: 'https://placehold.jp/180x260.png'}}
                      style={{
                        height: 80,
                        width: 80,
                        borderRadius: 6,
                      }}
                      PlaceholderContent={<ActivityIndicator />}
                      resizeMode={'cover'}
                    />
                    <Text style={{textAlign: 'center'}}>{item.name}</Text>
                  </View>
                );
              }}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item: any) => item.id.toString()}
              style={{marginTop: 4}}
            />
          </View>
          <View>
            <Text style={styles.subtitle}>Execution</Text>
            <ScrollView>
              {steps.map(step => {
                return (
                  <View
                    style={{...styles.row, gap: 20, marginBottom: 10}}
                    key={step.id}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: theme.colors.text,
                      }}>
                      {step.id}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: theme.colors.text,
                        width: '90%',
                      }}>
                      {step.content}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 5,
    position: 'absolute',
    top: 8,
    left: 8,
  },
  details: {
    marginHorizontal: 12,
    marginBottom: 48,
  },
  heading: {
    marginTop: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  tag: {
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: theme.colors.statusBar,
  },
  addButton: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.button,
  },
  playButton: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
    top: -30,
    borderRadius: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
export default ExerciceDetails;
