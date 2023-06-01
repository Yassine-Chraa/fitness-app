import { Image } from '@rneui/themed';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Screen from '../../components/Screen';
import theme from '../../constants/theme';
import { useExercise } from '../../context/providers/ExerciseContextProvider';
import AnimatedLottieView from 'lottie-react-native';
import animations from '../../constants/animations'

const MuscleExercices = ({ navigation, route }: any) => {
  const { exercises, getMuscleExercises } = useExercise();
  const { muscle } = route.params;

  useEffect(() => {
    getMuscleExercises(muscle)
    console.log(muscle)
  }, [muscle])

  return (
    <Screen name={muscle} noAction backButton allowScroll>
      {exercises.map((exercise: any) => {
        return (
          <TouchableOpacity
            key={exercise.id}
            style={styles.exercice}
            onPress={() =>
              navigation.navigate('ExerciceDetails', { exercise })
            }>
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={styles.image}
                source={{ uri: exercise.img }}
              />
              <View style={{ gap: 4, justifyContent: 'center' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: theme.colors.text,
                    fontWeight: 'bold',
                  }}>
                  {exercise.title}
                </Text>
                <Text>{exercise.category}</Text>
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
