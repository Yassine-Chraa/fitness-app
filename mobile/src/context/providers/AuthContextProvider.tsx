import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import getData from '../../Helpers/Storage/getData';
import storeData from '../../Helpers/Storage/storeData';
import CodeType from '../../types/CodeType';
import EmailType from '../../types/EmailType';
import ResetPasswordType from '../../types/ResetPasswordType';
import SignInObj from '../../types/SignInObj';
import SignUpObj from '../../types/SignUpObj';

export type AuthContextType = {
    isLogged: boolean,
    setState: (value: boolean) => void,
    getState: () => void,
    sendEmail: (email: EmailType) => Promise<any>,
    checkCode: (code: CodeType) => Promise<any>,
    resetPassword: (form: ResetPasswordType) => Promise<any>,
    signIn: (form: any) => Promise<any>,
    signUp: (form: any) => Promise<any>,
    logOut: () => Promise<any>,
    deleteAccount: () => Promise<any>,
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('Auth Provider is missing !');
    return context;
};

const sendEmailUrl = getUrl('sendEmail');
const checkCodeUrl = getUrl('checkCode');
const newPasswordUrl = getUrl('newPassword');
const signInUrl = getUrl('SignIn');
const signUpUrl = getUrl('SignUp');
const logOutUrl = getUrl('LogOut');
const deleteAccountUrl = getUrl('DeleteAccount');

export const AuthContextProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(false);
    const [isLogged, setIsLogged] = useState(false);


    //----------------------------------------------------------
    const getState = () => {
        getData('isLogged').then((res: string | null) => {
            if (res == 'true') setIsLogged(true);
            else setIsLogged(false);
        });
    };
    //----------------------------------------------------------
    const setState = (value: boolean) => {
        storeData('isLogged', value).then((res: any) => {
            if (res == 'true') setIsLogged(prev => value);
            else setIsLogged(prev => prev);
        });
    };
    //----------------------------------------------------------
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
            setIsLogged(true)
            return "_SUCCESS_";
        } catch (error) {
            setLoading(false);
            return "_FAILURE_";
        }
    };
    //----------------------------------------------------------
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
    //----------------------------------------------------------
    const logOut = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${logOutUrl}`);
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            return false;
        }
    };
    //----------------------------------------------------------
    const sendEmail = async (email: EmailType) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${sendEmailUrl}`, email);
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            return false;
        }
    };
    //----------------------------------------------------------
    const checkCode = async (code: CodeType) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${checkCodeUrl}`, code);
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            return false;
        }
    };
    //----------------------------------------------------------
    const resetPassword = async (form: ResetPasswordType) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${newPasswordUrl}`, form);
            console.log("data ===> " + JSON.stringify(data))
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            return false;
        }
    };
    //----------------------------------------------------------
    const deleteAccount = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${deleteAccountUrl}`);
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
                sendEmail,
                checkCode,
                resetPassword,
                signIn,
                signUp,
                logOut,
                deleteAccount,
                setState,
                getState,
                isLogged,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
