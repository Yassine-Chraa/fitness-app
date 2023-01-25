import { createContext, useContext, useState } from "react";
import { getUrl, currentUser } from "../API/Helper";

const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("User Provider is missing");
    return context;
};


export const authContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const signIn = async (user) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };

            const { data } = await axios.post(`${getUrl('sign_in')}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            alert(error);
            setLoading(false);
        }
    };
    const signUp = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get(`${AuthUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const logOut = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.post(`${AuthUrl}`, User, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const resetPassword = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.put(`${AuthUrl}`, id, User, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const deleteAccount = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get(`${AuthUrl}`, id, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <authContext.Provider
            value={{
                signIn,
                signUp,
                logOut,
                resetPassword,
                deleteAccount,
            }}
        >
            {children}
        </authContext.Provider>
    );
};
