import { createContext, useContext } from "react";
import { useMaterialUIController, setLoadingAnimation } from "../../UIContext";
import { getUrl } from "../Helper";

const workoutContext = createContext();

export const useWorkOut = () => {
    const context = useContext(workoutContext);
    if (!context) throw new Error("WorkOut Provider is missing");
    return context;
};

const WorkOutUrl = getUrl('WorkOuts');

export const WorkOutContextProvider = ({ children }) => {

    const [controller, dispatch] = useMaterialUIController();

    //-------------> perfect
    const getWorkOuts = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };

            const { data } = await axios.get(`${WorkOutUrl}`, config);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            alert(WorkOutUrl)
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const getWorkOut = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.get(`${WorkOutUrl}/${id}`, config);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const addWorkOut = async (WorkOut) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            alert("before")
            const { data } = await axios.post(`${WorkOutUrl}`, WorkOut, config);
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
    const updateWorkOut = async (WorkOut) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.put(`${WorkOutUrl}/${WorkOut.id}`, WorkOut, config);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error)
            setLoadingAnimation(dispatch, false);
        }
    };

    const deleteWorkOut = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.delete(`${WorkOutUrl}/${id}`, config);
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
                getWorkOuts,
                getWorkOut,
                addWorkOut,
                updateWorkOut,
                deleteWorkOut,
            }}
        >
            {children}
        </workoutContext.Provider>
    );
};
