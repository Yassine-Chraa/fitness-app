import {Image, Input} from '@rneui/themed';
import {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';

const EditInput = ({label, value}: any) => {
  return (
    <View>
      <Input
        style={styles.input}
        value={value}
        inputMode="numeric"
        label={label}
        labelStyle={styles.label}
        containerStyle={{height: 60}}
      />
    </View>
  );
};
const EditWorkout = ({navigation, route}: any) => {
  const width = Dimensions.get('screen').width;
  const workoutExercices = [
    {
      id: 1,
      name: 'Barbell Incline Bench Press',
      target: 'Chest',
      sets: 3,
      reps: 12,
      rest: '90s',
    },
    {
      id: 2,
      name: 'Dumbbell Incline Bench Press',
      target: 'Chest',
      sets: 3,
      reps: 12,
      rest: '90s',
    },
  ];

  return (
    <Screen
      name="Edit Workout"
      noAction
      backButton
      actionButton
      actionButtonType="Confirm">
      <View>
        <FlatList
          data={workoutExercices}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, drag, isActive}: any) => {
            const txt = `${item.sets}x${item.reps} reps / rest ${item.rest}`;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.exercice}
                onPress={() =>
                  navigation.navigate('ExerciceDetails', {
                    name: item.name,
                    type: 'workout',
                  })
                }>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={styles.image}
                    source={{uri: 'https://placehold.jp/60x60.png'}}
                  />
                  <View
                    style={{
                      rowGap: 8,
                      justifyContent: 'center',
                      width: width - 108,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: theme.colors.text,
                          fontWeight: 'bold',
                        }}>
                        {item.name}
                      </Text>
                      <TouchableOpacity>
                        <Icon
                          name="times"
                          color={theme.colors.text}
                          size={16}
                          style={{marginTop: 6}}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                        <EditInput label="Sets" value="3" />
                        <EditInput label="Reps" value="12" />
                        <EditInput label="Rest (s)" value="90" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  exercice: {
    flexDirection: 'row',
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  image: {
    height: 60,
    width: 60,
    marginRight: 8,
    borderRadius: 30,
  },
  input: {
    paddingHorizontal: 8,
    paddingVertical: 0,
    fontSize: 16,
    marginLeft: 'auto',
  },
  label: {
    fontSize: 14,
  },
});

export default EditWorkout;
