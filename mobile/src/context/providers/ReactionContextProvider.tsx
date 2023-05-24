import axios from '../../Helpers/axiosConfig';
import React, { createContext, useContext } from 'react';
import { Alert } from 'react-native';
import { getUrl } from '../../Helpers/APIConfig';
import Reaction from '../../types/ReactionType';
import { useUIController, setLoadAnimation, setIsCheckStateOk } from '../UIContext';
import ReactionType from '../../types/ReactionType';

export type ReactionContextType = {
    getReactionByPostUserId: (reaction: ReactionType) => Promise<Array<any>>;
    getReactionsByPostId: (user_id: any) => Promise<Array<any>>;
    getReactions: () => Promise<Array<any>>;
    getReaction: (id: number) => Promise<any>;
    addReaction: (Reaction: Reaction) => Promise<{ message: string }>;
    updateReaction: (id: number, Reaction: Reaction) => Promise<{ message: string }>;
    deleteReaction: (id: number) => Promise<{ message: string }>;
    deleteReactionByPostUserId: (Reaction: Reaction) => Promise<{ message: string }>;
};

const ReactionContext = createContext<ReactionContextType | null>(null);

export const useReaction = () => {
    const context = useContext(ReactionContext);
    if (!context) throw new Error('Reaction Provider is missing');
    return context;
};

const ReactionUrl = getUrl('Reactions');
const DeleteReactionByPostUserIdUrl = getUrl('DeleteReactionByPostUserId');
const GetReactionByPostUserIdUrl = getUrl('GetReactionByPostUserId');

export const ReactionContextProvider = ({ children }: any) => {
    const [controller, dispatch] = useUIController();

    //----------------------------------------
    const getReactionByPostUserId = async (reaction: ReactionType) => {
        try {
            const { data } = await axios.get(`${GetReactionByPostUserIdUrl}/${reaction.user_id}/${reaction.post_id}`);
            return data;
        } catch (error) {
            console.log(error);
            console.log("[error]===> " + GetReactionByPostUserIdUrl)
            return false;
        }
    };

    //----------------------------------------
    const getReactions = async () => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${ReactionUrl}`);
            setLoadAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            setLoadAnimation(dispatch, false);
            return false;
        }
    };

    //-----------------------------------------
    const getReactionsByPostId = async (post_id: number) => {
        try {
            const { data } = await axios.get(`${ReactionUrl}/${post_id}`);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
        }
    };

    //-----------------------------------------
    const getReaction = async (id: number) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${ReactionUrl}/${id}`);
            setLoadAnimation(dispatch, false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoadAnimation(dispatch, false);
        }
    };

    //-----------------------------------------
    const addReaction = async (Reaction: ReactionType) => {
        try {
            const { data } = await axios.post(`${ReactionUrl}`, Reaction);
            return data;
        } catch (error) {
            console.log(error);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: false,
                    message: "Something went wrong, please try again !"
                });
        }
    };

    //-----------------------------------------
    const updateReaction = async (id: number, Reaction: ReactionType) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.put(`${ReactionUrl}`, Reaction);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "You have got the Reaction successfully !"
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
                    message: "You have got the Reaction successfully !"
                });
            return false;
        }
    };

    //-----------------------------------------
    const deleteReaction = async (id: number) => {
        try {
            const { data } = await axios.get(`${ReactionUrl}/${id}`);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            return false;
        }
    };

    //-----------------------------------------
    const deleteReactionByPostUserId = async (reaction: ReactionType) => {
        try {
            const { data } = await axios.delete(`${DeleteReactionByPostUserIdUrl}/${reaction.user_id}/${reaction.post_id}`);
            return data;
        } catch (error) {
            console.log("|=====> deleteReactionByPostUserId is not working !")
            console.log(error);
            return false;
        }
    };

    return (
        <ReactionContext.Provider
            value={{
                getReactionByPostUserId,
                getReactions,
                getReaction,
                addReaction,
                getReactionsByPostId,
                updateReaction,
                deleteReaction,
                deleteReactionByPostUserId,
            }}>
            {children}
        </ReactionContext.Provider>
    );
};
