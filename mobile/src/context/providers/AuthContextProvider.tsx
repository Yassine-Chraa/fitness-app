import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { getUrl, currentUser } from '../../Helpers/APIConfig';
import storeData from '../../Helpers/Storage/storeData';
import SignInObj from '../../types/SignInObj';
import SignUpObj from '../../types/SignUpObj';

export type AuthContextType = {
  isLogged: boolean;
  updateState: () => Promise<void>;
  signIn: (form: any) => Promise<string>;
  signUp: (form: any) => Promise<string>;
  logout: () => void;
  resetPassword: (email: string) => Promise<string>;
  deleteAccount: () => Promise<any>;
  getCart: (id: number) => Promise<Array<object>>;
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
const userUrl = getUrl('Users');



const config = {
  headers: {
    authorization: `Bearer ${currentUser.token}`,
  },
};
export const AuthContextProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const updateState = async () => {
    const res = await AsyncStorage.getItem('isLogged');
    if (res == 'true') setIsLogged(true);
    else setIsLogged(false);
  };
  const signIn = async (form: SignInObj) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${signInUrl}`, form);
      if (data) {
        const storeResult = await storeData('current_user', data);
        console.log(data);
        axios.defaults.headers.common[
          "authorization"
        ] = `Bearer ${data.token}`;
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
      const { data } = await axios.post(`${signUpUrl}`, form);
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
      const { data } = await axios.get(`${deleteAccountUrl}`, config);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const getCart = async (id: number) => {
    try {
      console.log(`${userUrl}/cart/${id}`);
      const { data } = await axios.get(`${userUrl}/cart/${id}`);
      return data;
    } catch (e) {
      console.log(e);
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
        getCart,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
