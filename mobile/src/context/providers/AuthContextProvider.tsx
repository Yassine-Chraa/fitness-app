import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {createContext, useContext, useState} from 'react';
import {getUrl, currentUser} from '../../Helpers/APIConfig';
import storeData from '../../Helpers/Storage/storeData';
import SignInObj from '../../types/SignInObj';
import SignUpObj from '../../types/SignUpObj';

export type AuthContextType = {
  isLogged: boolean;
  updateState: () => void;
  signIn: (form: any) => Promise<any>;
  signUp: (form: any) => Promise<any>;
  logout: () => void;
  resetPassword: (email: string) => Promise<any>;
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
const resetPasswordUrl = getUrl('ResetPassword');
const deleteAccountUrl = getUrl('DeleteAccount');
const csrfTokenUrl = getUrl('CsrfToken');

const config = {
  headers: {
    authorization: `Bearer ${currentUser.token}`,
  },
};

export const AuthContextProvider = ({children}: any) => {
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const updateState = () => {
    AsyncStorage.getItem('isLogged').then((res: string | null) => {
      if (res == 'true') setIsLogged(true);
      else setIsLogged(false);
    });
  };
  const signIn = async (form: SignInObj) => {
    setLoading(true);
    try {
      const {data} = await axios.post(`${signInUrl}`, form);
      if (data) {
        const storeResult = await storeData('current_user', data);
        console.log(data)
        if (!storeResult) {
          return '_STORAGE_ERROR_';
        }
        AsyncStorage.setItem('isLogged', 'true');
        updateState();
      }
      setLoading(false);
      return '_SUCCESS_';
    } catch (error) {
      setLoading(false);
      return '_FAILURE_';
    }
  };
  const signUp = async (form: SignUpObj) => {
    setLoading(true);
    try {
      const {data} = await axios.post(`${signUpUrl}`, form);
      if (data) {
        const storeResult = await storeData('current_user', data);
        if (!storeResult) {
          return '_STORAGE_ERROR_';
        }
        AsyncStorage.setItem('isLogged', 'true');
        updateState();
      }
      setLoading(false);
      return '_SUCCESS_';
    } catch (error) {
      setLoading(false);
      return '_FAILURE_';
    }
  };
  const logout = async () => {
    //Todo: clear user tokens from db
    await AsyncStorage.removeItem('current_user');
    await AsyncStorage.setItem('isLogged', 'false');
    setIsLogged(false);
  };
  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      console.log(csrfTokenUrl);
      const res = await axios.get(csrfTokenUrl);
      const csrfToken = res.data.csrfToken;
      axios.post(resetPasswordUrl, {
        _token: csrfToken,
        email,
      });
      setLoading(false);
      return 'You will receive email with your password reset link!';
    } catch (error) {
      setLoading(false);
      return '';
    }
  };
  const deleteAccount = async () => {
    try {
      setLoading(true);
      const {data} = await axios.get(`${deleteAccountUrl}`, config);
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
        isLogged,
        updateState,
        signIn,
        signUp,
        logout,
        resetPassword,
        deleteAccount,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
