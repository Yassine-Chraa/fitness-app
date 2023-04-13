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
  const {type} = route.params;
  const {title,category,description,img} = route.params.exercise;
  return (
    <ScrollView style={{flex: 1}}>
      <View>
      <Image
            source={{uri: img}}
            style={{
              height: 300,
              zIndex: 1,
            }}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode={'cover'}
          />

        <View style={styles.details}>
          <TouchableWithoutFeedback>
            <View style={styles.playButton}>
              <Icon name="play" size={20} color={'#fff'} />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.heading}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={{...styles.row, marginBottom: 24}}>
            <View style={styles.tag}>
              <Text>{category}</Text>
            </View>
          </View>
          {type !== 'workout' ? (
            <View style={{...styles.row, marginBottom: 24}}>
              <View style={{width: width / 3 - 1}}>
                <CustomTextInput
                  placeholder="Sets"
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
          <View>
            <Text style={styles.subtitle}>Execution</Text>
            <Text>
              {description}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color={'#fff'} />
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
