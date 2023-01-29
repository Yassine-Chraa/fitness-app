import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { getUrl, currentUser } from '../../Helpers/APIConfig';
import User from '../../types/User';

export type UserContextType = {
    getUsers: () => Promise<Array<User>>;
    getUser: (id: number) => Promise<User>;
    addUser: (User: User) => Promise<{ message: string }>;
    updateUser: (id: number, User: User) => Promise<{ message: string }>;
    deleteUser: (id: number) => Promise<{ message: string }>;
};
const userContext = createContext<UserContextType | null>(null);

export const useUser = () => {
    const context = useContext(userContext);
    if (!context) throw new Error('User Provider is missing');
    return context;
};

const UserUrl = getUrl('Users');

export const UserContextProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(false);
    const getUsers = async () => {
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };

            const { data } = await axios.get(`${UserUrl}`, config);
            console.log(data)
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const getUser = async (id: number) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get(`${UserUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoading(false);
        }
    };
    const addUser = async (User: User) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.post(`${UserUrl}`, User, config);
            setLoading(false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoading(false);
        }
    };
    const updateUser = async (id: number, User: User) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.put(`${UserUrl}`, User, config);
            setLoading(false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoading(false);
        }
    };
    const deleteUser = async (id: number) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get(`${UserUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoading(false);
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
            }}>
            {children}
        </userContext.Provider>
    );
};
