import { createContext, useContext, useState } from "react";
import { useMaterialUIController, setLoadingAnimation } from "../../UIContext";
import { getUrl } from "../Helper";

const userContext = createContext();

export const useUser = () => {
    const context = useContext(userContext);
    if (!context) throw new Error("User Provider is missing");
    return context;
};

const UserUrl = getUrl("Users");

export const UserContextProvider = ({ children }) => {
    const [controller, dispatch] = useMaterialUIController();

    //-------------> perfect
    const getUsers = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${UserUrl}`);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const getUser = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${UserUrl}/${id}`);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const addUser = async (User) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.post(`${UserUrl}`, User);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
            setLoadingAnimation(dispatch, false);
        }
    };
    //-------------> perfect
    const updateUser = async (User) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.put(`${UserUrl}/${User.id}`, User);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
            setLoadingAnimation(dispatch, false);
        }
    };

    const deleteUser = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.delete(`${UserUrl}/${id}`);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
            setLoadingAnimation(dispatch, false);
        }
    };

    return (
        <userContext.Provider
            value={{
                getUsers,
                getUser,
                addUser,
                updateUser,
                deleteUser,
            }}
        >
            {children}
        </userContext.Provider>
    );
};
