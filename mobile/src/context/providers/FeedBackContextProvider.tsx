import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getUrl } from '../../Helpers/APIConfig';
import FeedBack from '../../types/FeedBack';
import getData from '../../Helpers/Storage/getData';
import UserInfo from '../../types/UserInfo';

export type feedBackContextType = {
    getFeedBacks: () => Promise<Array<FeedBack>>;
    getFeedBack: (id: number) => Promise<FeedBack>;
    addFeedBack: (FeedBack: FeedBack) => Promise<{ message: string }>;
    updateFeedBack: (id: number, FeedBack: FeedBack) => Promise<{ message: string }>;
    deleteFeedBack: (id: number) => Promise<{ message: string }>;
};

const feedBackContext = createContext<feedBackContextType | null>(null);

export const useFeedBack = () => {
    const context = useContext(feedBackContext);
    if (!context) throw new Error('FeedBack Provider is missing');
    return context;
};

const FeedBackUrl = getUrl('FeedBacks');

export const feedBackContextProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserInfo>()

    useEffect(() => {
        getData("current_user").then((user) =>
            setCurrentUser(() => user))
    })


    const getFeedBacks = async () => {
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser?.token}`,
                },
            };

            const { data } = await axios.get(`${FeedBackUrl}`, config);
            console.log(data)
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const getFeedBack = async (id: number) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser?.token}`,
                },
            };
            const { data } = await axios.get(`${FeedBackUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoading(false);
        }
    };
    const addFeedBack = async (FeedBack: FeedBack) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser?.token}`,
                },
            };
            console.log(FeedBack) //------------
            const { data } = await axios.post(`${FeedBackUrl}`, FeedBack, config);
            console.log(data)
            setLoading(false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoading(false);
        }
    };
    const updateFeedBack = async (id: number, FeedBack: FeedBack) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser?.token}`,
                },
            };
            const { data } = await axios.put(`${FeedBackUrl}`, FeedBack, config);
            setLoading(false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoading(false);
        }
    };
    const deleteFeedBack = async (id: number) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser?.token}`,
                },
            };
            const { data } = await axios.get(`${FeedBackUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <feedBackContext.Provider
            value={{
                getFeedBacks,
                getFeedBack,
                addFeedBack,
                updateFeedBack,
                deleteFeedBack,
            }}>
            {children}
        </feedBackContext.Provider>
    );
};