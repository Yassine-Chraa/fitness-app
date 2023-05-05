import {Image} from '@rneui/themed';
import {useEffect,useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../../constants/theme';
import { useProgram } from '../../context/providers/ProgramContextProvider';
import { useAuth } from '../../context/providers/AuthContextProvider';

const Discover = ({navigation}: any) => {
  const {currentUser} = useAuth();
  const {getPrograms,getUserPrograms,programs,userPrograms} = useProgram();
  const [filtredPrograms,setFiltredPrograms] = useState<any>([])

  const fetch = async ()=>{
    await getUserPrograms(currentUser!.user.id);
    await getPrograms();
    const temp = programs.filter(program=>{
      const map = userPrograms.map((item)=>{
        return item.details.id;
      })
      
      return map.includes(program.id) == false;
    })
    setFiltredPrograms(temp);
    
  }
  useEffect(()=>{
    fetch()
  },[currentUser])
  console.log('sss')
  return (
    <SafeAreaView style={{paddingHorizontal: 12, flex: 1}}>
      <ScrollView style={{marginTop: 12,marginBottom: 4}} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" color={'#fff'} size={15} />
          <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
            Tous
          </Text>
        </TouchableOpacity>
        {filtredPrograms.map((program: any) => {
          return (
            <TouchableHighlight
              key={program.id}
              style={styles.program}
              onPress={() =>
                navigation.navigate('ProgramDetails', {program: program})
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
                  {!program.isFree ? (
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
                  <Text
                    style={{fontSize: 28, color: '#fff', fontWeight: 'bold'}}>
                    {program.title}
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

export default Discover;
