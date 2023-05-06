import axios from '../../Helpers/axiosConfig';
import React, { createContext, useContext } from 'react';
import { Alert } from 'react-native';
import { getUrl } from '../../Helpers/APIConfig';
import Comment from '../../types/CommentType';
import { useUIController, setLoadAnimation, setIsCheckStateOk } from '../UIContext';
import CommentType from '../../types/CommentType';

export type CommentContextType = {
    getCommentsByPostId: (Post_id:any) => Promise<Array<any>>;
    getComments: () => Promise<Array<any>>;
    getComment: (id: number) => Promise<any>;
    addComment: (Comment: Comment) => Promise<{ message: string }>;
    updateComment: (id: number, Comment: Comment) => Promise<{ message: string }>;
    deleteComment: (id: number) => Promise<{ message: string }>;
};

const CommentContext = createContext<CommentContextType | null>(null);

export const useComment = () => {
    const context = useContext(CommentContext);
    if (!context) throw new Error('Comment Provider is missing');
    return context;
};

const CommentUrl = getUrl('Comments');
const CommentsByPostId = getUrl('CommentsByPostId');

export const CommentContextProvider = ({ children }: any) => {
    const [controller, dispatch] = useUIController();

    //----------------------------------------
    const getCommentsByPostId = async (Post_id:any) => {
        try {
            const { data } = await axios.get(`${CommentsByPostId}/${Post_id}`);
            return data;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    //----------------------------------------
    const getComments = async () => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${CommentUrl}`);
            setLoadAnimation(dispatch, false);
            return data;
        } catch (error) {
            console.log(error);
            setLoadAnimation(dispatch, false);
            return false;
        }
    };

    //-----------------------------------------
    const getComment = async (id: number) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${CommentUrl}/${id}`);
            setLoadAnimation(dispatch, false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoadAnimation(dispatch, false);
        }
    };
    const addComment = async (Comment: CommentType) => {
        try {
            setLoadAnimation(dispatch, true);
            console.log(Comment) //------------
            const { data } = await axios.post(`${CommentUrl}`, Comment);
            console.log(data)
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "You have got the Comment successfully !"
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
                    message: "You have got the Comment successfully !"
                });
        }
    };
    const updateComment = async (id: number, Comment: CommentType) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.put(`${CommentUrl}`, Comment);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "You have got the Comment successfully !"
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
                    message: "You have got the Comment successfully !"
                });
            return false;
        }
    };
    const deleteComment = async (id: number) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${CommentUrl}`);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "You have got the Comment successfully !"
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
                    message: "You have got the Comment successfully !"
                });
            return false;
        }
    };

    return (
        <CommentContext.Provider
            value={{
                getCommentsByPostId,
                getComments,
                getComment,
                addComment,
                updateComment,
                deleteComment,
            }}>
            {children}
        </CommentContext.Provider>
    );
};
