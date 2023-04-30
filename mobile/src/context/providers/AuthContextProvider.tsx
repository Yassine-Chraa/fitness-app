import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import storeData from '../../Helpers/Storage/storeData';
import SignInObj from '../../types/SignInObj';
import SignUpObj from '../../types/SignUpObj';
import UserInfo from '../../types/UserInfo';
import getData from '../../Helpers/Storage/getData';
import { useUIController, setLoadAnimation } from '../UIContext';

export type AuthContextType = {
  currentUser: UserInfo | null;
  updateState: () => Promise<void>;
  signIn: (form: any) => Promise<string>;
  signUp: (form: any) => Promise<string>;
  logout: () => void;
  resetPassword: (email: string) => Promise<string>;
  deleteAccount: () => Promise<any>;
  updateCurrentUser: (user: any) => Promise<Boolean>;
  weights: Array<any>;
  getUserWeights: (user_id: number) => Promise<void>;
  addUserWeight: (user_id: number, value: number, date: string) => Promise<string>;
  editUserWeight: (user_id: number, value: number, date: string) => Promise<string>;
  deleteUserWeight: (user_id: number, date: string) => Promise<string>;

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
  const [currentUser, setCurrentUser] = useState(null);
  const [weights, setWeights] = useState
  const [controller, dispatch] = useUIController();
  const } = controller

  const updateState = async () => {
    setCurrentUser(await getData('current_user'));
  };
  const signIn = async (form: SignInObj) => {
    setLoadAnimation(dispatch, true);
    try {
      const { data } = await axios.post(`${signInUrl}`, form);
      setCurrentUser(data)
      await storeData('current_user', data);
      axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${data.token}`;
      await AsyncStorage.setItem('isLogged', 'true');
      setLoadAnimation(dispatch, false);
      return '_SUCCESS_';
    } catch (error) {
      setLoadAnimation(dispatch, false);
      return '_FAILURE_';
    }
  };
  const signUp = async (form: SignUpObj) => {
    setLoadAnimation(dispatch, true);
    try {
      const { data } = await axios.post(`${signUpUrl}`, form);
      setCurrentUser(data)
      await storeData('current_user', data);
      axios.defaults.headers.common[
        "authorization"
      ] = `Bearer ${data.token}`;
      await AsyncStorage.setItem('isLogged', 'true');
      setLoadAnimation(dispatch, false);
      return '_SUCCESS_';
    } catch (error) {
      setLoadAnimation(dispatch, false);
      return '_FAILURE_';
    }
  };
  const logout = async () => {
    await AsyncStorage.removeItem('current_user');
    setCurrentUser(null)
  };
  const resetPassword = async (email: string) => {
    try {
      setLoadAnimation(dispatch, true);
      const res = await axios.get(csrfTokenUrl);
      const csrfToken = res.data.csrfToken;
      axios.post(resetPasswordUrl, {
        _token: csrfToken,
        email,
      });
      setLoadAnimation(dispatch, false);
      return 'You will receive email with your password reset link!';
    } catch (error) {
      setLoadAnimation(dispatch, false);
      return '';
    }
  };
  const deleteAccount = async () => {
    try {
      setLoadAnimation(dispatch, true);
      const { data } = await axios.get(`${deleteAccountUrl}`);
      setLoadAnimation(dispatch, false);
      return data;
    } catch (error) {
      setLoadAnimation(dispatch, false);
      return false;
    }
  };
  const updateCurrentUser = async (user: any) => {
    setLoadAnimation(dispatch, true);
    try {
      const { data } = await axios.put(`${usersUrl}/${currentUser?.user?.id}`, user);
      const current_user: UserInfo | null = currentUser;
      setCurrentUser((prev: any) => {
        return { ...prev, user: data }
      })
      await storeData('current_user', { ...current_user!, user: data });
      setLoadAnimation(dispatch, false);
      return true;
    } catch (error) {
      setLoadAnimation(dispatch, false);
      return false;
    }
  }
  const getUserWeights = async (user_id: number) => {
    try {
      const { data } = await axios.get(`${usersUrl}/weights/${user_id}`);
      setWeights(data);
    } catch (error) {
      console.log(error);
    }
  }
  const addUserWeight = async (user_id: number, value: number, date: string) => {
    try {
      const { data } = await axios.post(`${usersUrl}/weights/${user_id}`, { value, date });
      return data.message;
    } catch (error) {
      console.log(error);
    }
  }
  const editUserWeight = async (user_id: number, value: number, date: string) => {
    try {
      const { data } = await axios.put(`${usersUrl}/weights/${user_id}`, { value, date });
      console.log(data)
      return data.message;
    } catch (error) {
      console.log(error);
    }
  }
  const deleteUserWeight = async (user_id: number, date: string) => {
    try {
      const { data } = await axios.delete(`${usersUrl}/weights/${user_id}/${date}`);
      console.log(data)
      return data.message;
    } catch (error) {
      console.log(error);
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
        weights,
        getUserWeights,
        addUserWeight,
        editUserWeight,
        deleteUserWeight
      }}>
      {children}
    </AuthContext.Provider>
  );
};
