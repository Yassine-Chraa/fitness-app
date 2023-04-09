import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import storeData from '../../Helpers/Storage/storeData';
import SignInObj from '../../types/SignInObj';
import SignUpObj from '../../types/SignUpObj';
import UserInfo from '../../types/UserInfo';
import getData from '../../Helpers/Storage/getData';

export type AuthContextType = {
  currentUser: UserInfo | null;
  updateState: () => Promise<void>;
  signIn: (form: any) => Promise<string>;
  signUp: (form: any) => Promise<string>;
  logout: () => void;
  resetPassword: (email: string) => Promise<string>;
  deleteAccount: () => Promise<any>;
  updateCurrentUser: (user: any) => Promise<Boolean>;
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
const usersUrl = getUrl('Users');



export const AuthContextProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const updateState = async () => {
    setCurrentUser(await getData('current_user'));
  };
  const signIn = async (form: SignInObj) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${signInUrl}`, form);
      setCurrentUser(data)
      const storeResult = await storeData('current_user', data);
      axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${data.token}`;
      await AsyncStorage.setItem('isLogged', 'true');
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
      setCurrentUser(data)
      const storeResult = await storeData('current_user', data);
      axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${data.token}`;
      await AsyncStorage.setItem('isLogged', 'true');
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
    setCurrentUser(null)
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
      const { data } = await axios.get(`${deleteAccountUrl}`);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };
  const updateCurrentUser = async (user: any) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`${usersUrl}/${currentUser?.user?.id}`, user);
      const current_user: UserInfo | null = currentUser;
      setCurrentUser((prev: any) => {
        return { ...prev, user: data }
      })
      await storeData('current_user', { ...current_user!, user: data });
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        updateState,
        signIn,
        signUp,
        logout,
        resetPassword,
        deleteAccount,
        updateCurrentUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
