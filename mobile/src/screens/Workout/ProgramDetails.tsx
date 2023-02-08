import {Image} from '@rneui/themed';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';

const ProgramDetails = ({navigation, route}: any) => {
  const {program} = route.params;
  const programWorkouts: any = [
    {
      id: 1,
      name: 'Push Workout',
      exercicesNumber: 9,
      duration: 55,
    },
    {
      id: 2,
      name: 'Pull Workout',
      exercicesNumber: 10,
      duration: 60,
    },
    {
      id: 3,
      name: 'Legs Workout',
      exercicesNumber: 5,
      duration: 90,
    },
  ];
  const showExercices = (id:any)=>{

  }
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View>
          <Image
            style={{width: '100%', height: 240}}
            source={require('../../assets/images/program1.jpg')}
          />
          <View
            style={{
              position: 'absolute',
              left: 20,
              width: '70%',
              height: '100%',
              justifyContent: 'center',
            }}>
            {program.isPro ? (
              <Text style={styles.tag}>Pro</Text>
            ) : (
              <Text
                style={{
                  ...styles.tag,
                  backgroundColor: '#7D8F69',
                }}>
                Free
              </Text>
            )}
            <Text style={{fontSize: 18, color: '#fff'}}>
              {program.type} {program.days} Days
            </Text>
            <Text style={{fontSize: 28, color: '#fff', fontWeight: 'bold'}}>
              {program.name}
            </Text>
          </View>
        </View>
        <View style={styles.details}>
          {programWorkouts.map((workout: any) => {
            return (
              <TouchableOpacity
                key={workout.id}
                style={styles.workout}
                onPress={() => showExercices(workout.id)}>
                <Text style={styles.workoutTitle}>Day {workout.id}</Text>
                <View style={styles.workoutDetails}>
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: theme.colors.text,
                        marginTop: -4,
                      }}>
                      {workout.name}
                    </Text>
                    <Text>
                      {workout.exercicesNumber} exercices, {workout.duration}{' '}
                      min
                    </Text>
                  </View>
                  <View>
                    <Icon name="chevron-down" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          <View style={{marginTop: 16}}>
            <Text style={styles.subtitle}>Program description</Text>
            <Text style={styles.desc}>
              This is a three dayn beginner, general fitness plan that can be
              performed at the gym or in home. The only pieces of equipement
              youill need is a bench and dumbbells.
            </Text>
            <Text style={styles.author}>Created by Yassine Chraa</Text>
          </View>
        </View>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
          Select As Current Program
        </Text>
      </TouchableOpacity>
    </View>
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
    marginHorizontal: 16,
    marginBottom: 48,
    marginTop: 24,
  },
  heading: {
    marginTop: 8,
    marginBottom: 8,
  },
  tag: {
    color: '#fff',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 3,
    backgroundColor: theme.colors.secondary,
    marginRight: 'auto',
  },
  workout: {
    marginVertical: 4,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: theme.colors.statusBar,
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 4,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  desc: {
    fontSize: 16,
    color: theme.colors.text,
  },
  author: {
    marginTop: 8,
    fontSize: 16,
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  workoutTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  addButton: {
    zIndex: 2,
    marginLeft: 'auto',
    bottom: 10,
    right: 4,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.primary,
  },
});
export default ProgramDetails;
