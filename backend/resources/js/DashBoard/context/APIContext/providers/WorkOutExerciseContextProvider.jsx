import { createContext, useContext } from "react";
import { useMaterialUIController, setLoadingAnimation } from "../../UIContext";
import { getUrl } from "../Helper";

const workoutContext = createContext();

export const useWorkOutExercise = () => {
    const context = useContext(workoutContext);
    if (!context) throw new Error("WorkOutExercise Provider is missing");
    return context;
};

const WorkOutExerciseUrl = getUrl('WorkOutExercises');

export const WorkOutExerciseContextProvider = ({ children }) => {

    const [controller, dispatch] = useMaterialUIController();

    //-------------> perfect
    const getWorkOutExercises = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            alert("getting all workouts");
            const { data } = await axios.get(`${WorkOutExerciseUrl}`, config);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            alert(WorkOutExerciseUrl)
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const getWorkOutExercise = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.get(`${WorkOutExerciseUrl}/${id}`, config);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const addWorkOutExercise = async (WorkOutExercise) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            console.log(WorkOutExercise)
            const { data } = await axios.post(`${WorkOutExerciseUrl}`, WorkOutExercise, config);
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
    const updateWorkOutExercise = async (WorkOutExercise) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.put(`${WorkOutExerciseUrl}/${WorkOutExercise.id}`, WorkOutExercise, config);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoadingAnimation(dispatch, false);
        }
    };

    const deleteWorkOutExercise = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.delete(`${WorkOutExerciseUrl}/${id}`, config);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoadingAnimation(dispatch, false);
        }
    };

    return (
        <workoutContext.Provider
            value={{
                getWorkOutExercises,
                getWorkOutExercise,
                addWorkOutExercise,
                updateWorkOutExercise,
                deleteWorkOutExercise,
            }}
        >
            {children}
        </workoutContext.Provider>
    );
};
