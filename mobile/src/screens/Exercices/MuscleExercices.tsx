import {Image} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';

const MuscleExercices = ({navigation, route}: any) => {
  const {muscle} = route.params;
  const MuscleExercices = [
    {
      id: 1,
      name: 'Barbell Incline Bench Press',
      target: 'Chest',
    },
    {
      id: 2,
      name: 'Dumbbell Incline Bench Press',
      target: 'Chest',
    },
    {
      id: 3,
      name: 'Barbell Incline Bench Press',
      target: 'Chest',
    },
    {
      id: 4,
      name: 'Barbell Incline Bench Press',
      target: 'Chest',
    },
  ];
  return (
    <Screen name={muscle.name} action="search" backButton allowScroll>
      <TouchableOpacity style={styles.filterButton}>
        <Icon name="filter" color={'#fff'} size={16}/>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
          Tous
        </Text>
      </TouchableOpacity>
      {MuscleExercices.map((exercice: any) => {
        return (
          <TouchableOpacity
            key={exercice.id}
            style={styles.exercice}
            onPress={() =>
              navigation.navigate('ExerciceDetails', {name: exercice.name})
            }>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.image}
                source={{uri: 'https://placehold.jp/60x60.png'}}
              />
              <View style={{gap: 4, justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 18,
                    color: theme.colors.text,
                    fontWeight: 'bold',
                  }}>
                  {exercice.name}
                </Text>
                <Text>{exercice.target}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </Screen>
  );
};

const styles = StyleSheet.create({
  exercice: {
    flexDirection: 'row',
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.statusBar,
    borderRadius: 16,
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 16,
    borderRadius: 40,
  },
  filterButton: {
    marginRight: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.customCard,
  },
});

export default MuscleExercices;
