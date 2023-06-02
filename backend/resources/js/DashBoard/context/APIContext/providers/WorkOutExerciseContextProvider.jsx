import { createContext, useContext, useState } from "react";
import { useMaterialUIController, setLoadingAnimation, setMessageObject } from "../../UIContext";
import { getUrl } from "../Helper";

const workoutContext = createContext();

export const useWorkOutExercise = () => {
    const context = useContext(workoutContext);
    if (!context) throw new Error("WorkOutExercise Provider is missing");
    return context;
};

const WorkoutExerciseUrl = getUrl("WorkoutExercises");

export const WorkOutExerciseContextProvider = ({ children }) => {
    const [workoutExercises, setWorkoutExercises] = useState([]);
    const [controller, dispatch] = useMaterialUIController();


    const getWorkOutExercises = async (workoutId) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(
                `${WorkoutExerciseUrl}?workout_id=${workoutId}`
            );
            setWorkoutExercises(data);
            setLoadingAnimation(dispatch, false);
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
        }
    };

    const addExerciseToWorkout = async (workout_id, exercise_id) => {
        try {
            const { data } = await axios.post(WorkoutExerciseUrl, {
                workout_id,
                exercise_id,
            });
            setMessageObject(dispatch, {
                type: "success",
                message: data.message,
                state: "mount",
            });
            return true;
        } catch (error) {
            console.log(error);
            setMessageObject(dispatch, {
                type: "error",
                message: "Something Went wrong !",
                state: "mount",
            });
            return false;
        }
    };
    const updateWorkOutExercise = async (WorkOutExercise) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.put(
                `${WorkoutExerciseUrl}/${WorkOutExercise.id}`,
                WorkOutExercise,
                config
            );
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
            setLoadingAnimation(dispatch, false);
        }
    };

    const deleteWorkOutExercise = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.delete(
                `${WorkoutExerciseUrl}/${id}`,
                config
            );
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
            setLoadingAnimation(dispatch, false);
        }
    };

    return (
        <workoutContext.Provider
            value={{
                workoutExercises,
                getWorkOutExercises,
                addExerciseToWorkout,
                updateWorkOutExercise,
                deleteWorkOutExercise,
            }}
        >
            {children}
        </workoutContext.Provider>
    );
};
