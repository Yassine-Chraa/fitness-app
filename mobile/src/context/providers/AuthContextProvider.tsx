import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { getUrl, currentUser } from '../../Helpers/APIConfig';
import storeData from '../../Helpers/Storage/storeData';
import SignInObj from '../../types/SignInObj';
import SignUpObj from '../../types/SignUpObj';

export type AuthContextType = {
    signIn: (form: any) => Promise<any>;
    signUp: (form: any) => Promise<any>;
    logOut: () => Promise<any>;
    resetPassword: (newPassword: string) => Promise<any>;
    deleteAccount: () => Promise<any>;
};
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('Auth Provider is missing !');
    return context;
};

const signInUrl = getUrl('SignIn');
const signUpUrl = getUrl('SignUp');
const logOutUrl = getUrl('LogOut');
const resetPasswordUrl = getUrl('ResetPassword');
const deleteAccountUrl = getUrl('DeleteAccount');

const config = {
    headers: {
        authorization: `Bearer ${currentUser.token}`,
    },
};

export const AuthContextProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(false);
    const signIn = async (form: SignInObj) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${signInUrl}`, form);
            if (data) {
                const storeResult = await storeData('user-info', data);
                if (!storeResult) {
                    return "_STORAGE_ERROR_"
                }
            }
            setLoading(false);
            return "_SUCCESS_";
        } catch (error) {
            setLoading(false);
            return "_FAILURE_";
        }
    };
    const signUp = async (form: SignUpObj) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${signUpUrl}`, form);
            if (data) {
                const storeResult = await storeData('user-info', data);
                if (!storeResult) {
                    return "_STORAGE_ERROR_"
                }
            }
            setLoading(false);
            return "_SUCCESS_";
        } catch (error) {
            setLoading(false);
            return "_FAILURE_";
        }
    };
    const logOut = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${logOutUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            return false;
        }
    };
    const resetPassword = async (newPassword: string) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${resetPasswordUrl}`, newPassword, config);
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            return false;
        }
    };
    const deleteAccount = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${deleteAccountUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                logOut,
                resetPassword,
                deleteAccount,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
