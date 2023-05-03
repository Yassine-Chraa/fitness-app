import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import Exercise from '../../types/Exercise';

export type WorkoutContextType = {
  addWorkout: (programId:number,workout:any) => Promise<string>;
  updateWorkout: (programId:number,workoutId:number,workout:any) => Promise<string>;
  deleteWorkout: (programId:number,workoutId:number) => Promise<string>;
  addExerciseToWorkout: (workoutId:number,exercise:Exercise) => Promise<string>;
};
const WorkoutContext = createContext<WorkoutContextType | null>(null);

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error('Workout Provider is missing');
  return context;
};

const ProgamWorkoutsUrl = getUrl('ProgramWorkouts');
const WorkoutUrl = getUrl('Workouts');

export const WorkoutContextProvider = ({ children }: any) => {
  const addWorkout = async (programId:number,workout:any) => {
    try {
      const { data } = await axios.post(`${ProgamWorkoutsUrl}/${programId}`,workout);
      return data.message
    } catch (error) {
      console.log(error);
    }
  };
  const updateWorkout = async (workoutId:number,workout:any) => {
    try {
      const { data } = await axios.put(`${WorkoutUrl}/${workoutId}`,workout);
      return data.message
    } catch (error) {
      console.log(error);
    }
  };
  const deleteWorkout = async (workoutId:number) => {
    try {
      const { data } = await axios.delete(`${WorkoutUrl}/${workoutId}`);
      return data.message
    } catch (error) {
      console.log(error);
    }
  };
  const addExerciseToWorkout = async (workoutId:number,exercise:Exercise) => {
    try {
      const { data } = await axios.post(`${WorkoutUrl}/exercises/${workoutId}`,exercise);
      return data.message
    } catch (error) {
      console.log(error);
    }
  };
  
  //updateWorkoutExercise
  //deleteWorkoutExercise
  //AddToCurrentProgram
  //Chose Workout Screen

  return (
    <WorkoutContext.Provider
      value={{
        addWorkout,
        updateWorkout,
        deleteWorkout,
        addExerciseToWorkout,
      }}>
      {children}
    </WorkoutContext.Provider>
  );
};
