import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import Workout from '../../types/Workout';
import WorkoutExercise from '../../types/WorkoutExercise';

export type exeriseParmType = {
  id: number,
  sets: number,
  reps: number,
  rest: number,
}
export type WorkoutContextType = {
  workoutExercises: Array<WorkoutExercise>;
  addWorkout: (workout: Workout) => Promise<string>;
  updateWorkout: (workoutId: number, workout: { title: string, duration: number, day: string }) => Promise<string>;
  deleteWorkout: (workoutId: number) => Promise<string>;
  getWorkoutExercises: (workout_id: number) => Promise<void>;
  addExerciseToWorkout: (workout_id: number, exercise_id: number, others: undefined | { sets: number, reps: number, rest: number }) => Promise<string>;
  updateWorkoutExercise: (exercise: exeriseParmType) => Promise<string>;
  deleteWorkoutExercise: (exerciseId: number) => Promise<string>;
};
const WorkoutContext = createContext<WorkoutContextType | null>(null);

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error('Workout Provider is missing');
  return context;
};

const WorkoutUrl = getUrl('Workouts');
const workoutExercisesUrl = getUrl('WorkoutExercises');

export const WorkoutContextProvider = ({ children }: any) => {
  const [workoutExercises, setWorkoutExercises] = useState([])
  const addWorkout = async (workout: any) => {
    try {
      const { data } = await axios.post(WorkoutUrl, workout);
      return data.message
    } catch (error) {
      console.log(error);
    }
  };
  const updateWorkout = async (workoutId: number, workout: any) => {
    try {
      const { data } = await axios.put(`${WorkoutUrl}/${workoutId}`, workout);
      return data.message
    } catch (error) {
      console.log(error);
    }
  };
  const deleteWorkout = async (workoutId: number) => {
    try {
      const { data } = await axios.delete(`${WorkoutUrl}/${workoutId}`);
      return data.message
    } catch (error) {
      console.log(error);
    }
  };
  const getWorkoutExercises = async (workout_id: number) => {
    try {
      const { data } = await axios.get(`${workoutExercisesUrl}?workout_id=${workout_id}`);
      setWorkoutExercises(data)
    } catch (error) {
      console.log(error);
    }
  }
  const addExerciseToWorkout = async (workout_id: number, exercise_id: number, others: undefined | { sets: number, reps: number, rest: number }) => {
    try {
      let res;
      if (others) {
        res = await axios.post(workoutExercisesUrl, { workout_id, exercise_id, ...others });
      } else {
        res = await axios.post(workoutExercisesUrl, { workout_id, exercise_id });
      }
      return res.data.message
    } catch (error) {
      console.log(error);
    }
  };
  const updateWorkoutExercise = async (exercise: exeriseParmType) => {
    try {
      const { id, sets, reps, rest } = exercise
      const { data } = await axios.put(`${workoutExercisesUrl}/${id}`, { sets, reps, rest });
      return data.message
    } catch (error) {
      console.log(error);
    }
  };
  const deleteWorkoutExercise = async (exerciseId: number) => {
    try {
      const { data } = await axios.delete(`${workoutExercisesUrl}/${exerciseId}`);
      return data.message
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        workoutExercises,
        addWorkout,
        updateWorkout,
        deleteWorkout,
        getWorkoutExercises,
        addExerciseToWorkout,
        updateWorkoutExercise,
        deleteWorkoutExercise
      }}>
      {children}
    </WorkoutContext.Provider>
  );
};
