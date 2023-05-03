import {Image} from '@rneui/themed';
import {useEffect} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import { useAuth } from '../../context/providers/AuthContextProvider';
import { useProgram } from '../../context/providers/ProgramContextProvider';

const MyPrograms = ({navigation}: any) => {
  const {currentUser} = useAuth()
  const {getUserPrograms,userPrograms} = useProgram();

  useEffect(()=>{
    getUserPrograms(currentUser!.user!.id);
  },[currentUser])
  return (
    <SafeAreaView style={{paddingHorizontal: 12, flex: 1}}>
      <ScrollView style={{marginTop: 12,marginBottom: 4}} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" color={'#fff'} size={15} />
          <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
            Tous
          </Text>
        </TouchableOpacity>
        {userPrograms?.map((program: any) => {
            console.log(program.details)
          const {id,isFree,category,days,title} = program.details;
          return (
            <TouchableHighlight
              key={id}
              style={styles.program}
              onPress={() =>
                navigation.navigate('MyProgramsDetails', {program: program.details})
              }>
              <View>
                <Image
                  style={{width: '100%', height: 180, borderRadius: 8}}
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
                  {isFree ? (
                    <Text style={styles.tag}>Free</Text>
                  ) : (
                    <Text
                      style={{
                        ...styles.tag,
                        backgroundColor: '#7D8F69',
                      }}>
                      Pro
                    </Text>
                  )}
                  <Text style={{fontSize: 18, color: '#fff'}}>
                    {category} {days} Days
                  </Text>
                  <Text
                    style={{fontSize: 28, color: '#fff', fontWeight: 'bold'}}>
                    {title}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  program: {
    marginBottom: 16,
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
  filterButton: {
    marginRight: 'auto',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.secondary,
  },
});

export default MyPrograms;
