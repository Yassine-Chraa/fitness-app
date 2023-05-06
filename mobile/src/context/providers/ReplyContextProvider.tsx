import axios from '../../Helpers/axiosConfig';
import React, { createContext, useContext } from 'react';
import { Alert } from 'react-native';
import { getUrl } from '../../Helpers/APIConfig';
import Reply from '../../types/ReplyType';
import { useUIController, setLoadAnimation, setIsCheckStateOk } from '../UIContext';
import ReplyType from '../../types/ReplyType';

export type ReplyContextType = {
    getReplysByCommentId: (Comment_id: any) => Promise<Array<any>>;
    getReplys: () => Promise<Array<any>>;
    getReply: (id: number) => Promise<any>;
    addReply: (Reply: Reply) => Promise<{ message: string }>;
    updateReply: (id: number, Reply: Reply) => Promise<{ message: string }>;
    deleteReply: (id: number) => Promise<{ message: string }>;
};

const ReplyContext = createContext<ReplyContextType | null>(null);

export const useReply = () => {
    const context = useContext(ReplyContext);
    if (!context) throw new Error('Reply Provider is missing');
    return context;
};

const ReplyUrl = getUrl('Replies');
const ReplysByCommentId = getUrl('ReplysByCommentId');

export const ReplyContextProvider = ({ children }: any) => {
    const [controller, dispatch] = useUIController();

    //----------------------------------------
    const getReplysByCommentId = async (Comment_id: any) => {
        try {
            const { data } = await axios.get(`${ReplysByCommentId}/${Comment_id}`);
            return data;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    //----------------------------------------
    const getReplys = async () => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${ReplyUrl}`);
            setLoadAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            setLoadAnimation(dispatch, false);
            return false;
        }
    };

    //-----------------------------------------
    const getReply = async (id: number) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${ReplyUrl}/${id}`);
            setLoadAnimation(dispatch, false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoadAnimation(dispatch, false);
        }
    };
    const addReply = async (Reply: ReplyType) => {
        try {
            const { data } = await axios.post(`${ReplyUrl}`, Reply);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "You have got the Reply successfully !"
                });
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: false,
                    message: "You have got the Reply successfully !"
                });
        }
    };
    const updateReply = async (id: number, Reply: ReplyType) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.put(`${ReplyUrl}`, Reply);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "You have got the Reply successfully !"
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
                    message: "You have got the Reply successfully !"
                });
            return false;
        }
    };
    const deleteReply = async (id: number) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${ReplyUrl}`);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "You have got the Reply successfully !"
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
                    message: "You have got the Reply successfully !"
                });
            return false;
        }
    };

    return (
        <ReplyContext.Provider
            value={{
                getReplysByCommentId,
                getReplys,
                getReply,
                addReply,
                updateReply,
                deleteReply,
            }}>
            {children}
        </ReplyContext.Provider>
    );
};
