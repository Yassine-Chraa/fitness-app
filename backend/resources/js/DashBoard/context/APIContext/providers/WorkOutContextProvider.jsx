import { createContext, useContext } from "react";
import { useMaterialUIController, setLoadingAnimation } from "../../UIContext";
import { getUrl } from "../Helper";
import Swal from "sweetalert2";

const workoutContext = createContext();

export const useWorkOut = () => {
    const context = useContext(workoutContext);
    if (!context) throw new Error("WorkOut Provider is missing");
    return context;
};

const WorkOutUrl = getUrl("WorkOuts");

export const WorkOutContextProvider = ({ children }) => {
    const [controller, dispatch] = useMaterialUIController();
    const getWorkOuts = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${WorkOutUrl}`);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
            alert(WorkOutUrl);
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const getWorkOut = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${WorkOutUrl}/${id}`);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    const addWorkOut = async (WorkOut) => {
        try {
            setLoadingAnimation(dispatch, true);
            console.log(WorkOut);
            const { data } = await axios.post(`${WorkOutUrl}`, WorkOut);
            console.log(JSON.stringify(data));
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    const updateWorkOut = async (WorkOut) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.put(
                `${WorkOutUrl}/${WorkOut.id}`,
                WorkOut
            );
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
            setLoadingAnimation(dispatch, false);
        }
    };

    const deleteWorkOut = async (id) => {
        Swal.fire({
            title: "Are you sure to delete workout",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            width: "max-content",
            padding: "8px 16px",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoadingAnimation(dispatch, true);
                    const { data } = await axios.delete(`${WorkOutUrl}/${id}`);
                    setLoadingAnimation(dispatch, false);
                    return data;
                } catch (error) {
                    console.log(error);
                    alert(error);
                    setLoadingAnimation(dispatch, false);
                }
            }
        });
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
