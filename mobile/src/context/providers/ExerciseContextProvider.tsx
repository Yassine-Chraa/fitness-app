import axios from '../../Helpers/axiosConfig';
import React, { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import Exercise from '../../types/Exercise';

export type exerciseContextType = {
  exercises: Array<Exercise>;
  getExercises: () => Promise<void>;
  getMuscleExercises: (category:string) => Promise<void>;
};
const exerciseContext = createContext<exerciseContextType | null>(null);

export const useExercise = () => {
  const context = useContext(exerciseContext);
  if (!context) throw new Error('exercise Provider is missing');
  return context;
};

const exercisesUrl = getUrl('Exercises');

export const ExerciseContextProvider = ({ children }: any) => {
  const [exercises, setExercises] = useState([])
  const getExercises = async () => {
    try {
      const { data } = await axios.get(exercisesUrl);
      setExercises(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMuscleExercises = async (category:string) => {
    try {
      const { data } = await axios.get(`${exercisesUrl}?category=${category}`);
      setExercises(data);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <exerciseContext.Provider
      value={{
        exercises,
        getExercises,
        getMuscleExercises
      }}>
      {children}
    </exerciseContext.Provider>
  );
};
