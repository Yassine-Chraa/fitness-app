import { createContext, useContext } from "react";
import { useMaterialUIController, setLoadingAnimation } from "../../UIContext";
import { getUrl } from "../Helper";

const exerciseContext = createContext();

export const useExercise = () => {
    const context = useContext(exerciseContext);
    if (!context) throw new Error("Exercise Provider is missing");
    return context;
};

const ExerciseUrl = getUrl('Exercises');

export const ExerciseContextProvider = ({ children }) => {

    const [controller, dispatch] = useMaterialUIController();

    //-------------> perfect
    const getExercises = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };

            const { data } = await axios.get(`${ExerciseUrl}`, config);
            setLoadingAnimation(dispatch, false);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const getExercise = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.get(`${ExerciseUrl}/${id}`, config);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const addExercise = async (Exercise) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            alert("before")
            const { data } = await axios.post(`${ExerciseUrl}`, Exercise, config);
            console.log(JSON.stringify(data))
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const updateExercise = async (Exercise) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.put(`${ExerciseUrl}/${Exercise.id}`, Exercise, config);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoadingAnimation(dispatch, false);
        }
    };

    const deleteExercise = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.delete(`${ExerciseUrl}/${id}`, config);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoadingAnimation(dispatch, false);
        }
    };

    return (
        <exerciseContext.Provider
            value={{
                getExercises,
                getExercise,
                addExercise,
                updateExercise,
                deleteExercise,
            }}
        >
            {children}
        </exerciseContext.Provider>
    );
};
