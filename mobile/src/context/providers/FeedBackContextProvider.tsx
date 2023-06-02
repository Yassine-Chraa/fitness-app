import axios from '../../Helpers/axiosConfig';
import  React,{ createContext, useContext } from 'react';
import { Alert } from 'react-native';
import { getUrl } from '../../Helpers/APIConfig';
import FeedBack from '../../types/FeedBack';
import { useUIController, setLoadAnimation, setIsCheckStateOk } from '../UIContext';

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
    const [controller, dispatch] = useUIController();


    const getFeedBacks = async () => {
        try {
            setLoadAnimation(dispatch, true);

            const { data } = await axios.get(`${FeedBackUrl}`);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "You have got the feedback successfully !"
                });
            return data;
        } catch (error) {
            console.log(error);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: false,
                    message: "Ooops, Something went Wrong !"
                });
        }
    };
    const getFeedBack = async (id: number) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${FeedBackUrl}`);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "Your feedback get successfully"
                });
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: false,
                    message: "Ooops, Something went Wrong !"
                });
        }
    };
    const addFeedBack = async (FeedBack: FeedBack) => {
        try {
            setLoadAnimation(dispatch, true);
            console.log(FeedBack) //------------
            const { data } = await axios.post(`${FeedBackUrl}`, FeedBack);
            console.log(data)
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "Your feedback added successfully !"
                });
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: false,
                    message: "Ooops, Something went Wrong !"
                });
        }
    };
    const updateFeedBack = async (id: number, FeedBack: FeedBack) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.put(`${FeedBackUrl}`, FeedBack);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "Your feedback updated successfully"
                });
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: false,
                    message: "Ooops, Something went Wrong !"
                });
        }
    };
    const deleteFeedBack = async (id: number) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${FeedBackUrl}`);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "Your feedback deleted successfully"
                });
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: false,
                    message: "Ooops, Something went Wrong !"
                });
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
