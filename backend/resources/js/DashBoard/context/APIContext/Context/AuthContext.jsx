import { createContext, useContext, useState } from "react";
import { getUrl, currentUser } from "../API/Helper";

const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error("User Provider is missing");
    return context;
};

const signInUrl = getUrl('SignIn');
const signUpUrl = getUrl('SignUp');
const logOutUrl = getUrl('LogOut');
const resetPasswordUrl = getUrl('ResetPassword');
const deleteAccountUrl = getUrl('DeleteAccount');


export const authContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    const signIn = async (user) => {
        try {
            setLoading(true);
            // const config = {
            //     headers: {
            //         authorization: `Bearer ${currentUser.token}`,
            //     },
            // };

            const { data } = await axios.post(`${signInUrl}`, user);
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            return null;
        }
    };
    const signUp = async (user) => {
        try {
            setLoading(true);
            // const config = {
            //     headers: {
            //         authorization: `Bearer ${currentUser.token}`,
            //     },
            // };
            const { data } = await axios.post(`${signUpUrl}`, user);
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
            const { data } = await axios.post(`${logOutUrl}`, User, config);
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
            const { data } = await axios.put(`${resetPasswordUrl}`, id, User, config);
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
            const { data } = await axios.get(`${deleteAccountUrl}`, id, config);
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
