import axios from '../../Helpers/axiosConfig';
import React, { createContext, useContext } from 'react';
import { Alert } from 'react-native';
import { getUrl } from '../../Helpers/APIConfig';
import Post from '../../types/PostType';
import { useUIController, setLoadAnimation, setIsCheckStateOk } from '../UIContext';
import PostType from '../../types/PostType';

export type PostContextType = {
    getPostsByUserId: (user_id:any) => Promise<Array<any>>;
    getPosts: () => Promise<Array<any>>;
    getPost: (id: number) => Promise<any>;
    addPost: (Post: Post) => Promise<{ message: string }>;
    updatePost: (id: number, Post: Post) => Promise<{ message: string }>;
    deletePost: (id: number) => Promise<{ message: string }>;
};

const PostContext = createContext<PostContextType | null>(null);

export const usePost = () => {
    const context = useContext(PostContext);
    if (!context) throw new Error('Post Provider is missing');
    return context;
};

const PostUrl = getUrl('Posts');
const PostsByUserId = getUrl('PostsByUserId');

export const PostContextProvider = ({ children }: any) => {
    const [controller, dispatch] = useUIController();

    //----------------------------------------
    const getPostsByUserId = async (user_id:any) => {
        try {
            const { data } = await axios.get(`${PostsByUserId}/${user_id}`);
            return data;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    //----------------------------------------
    const getPosts = async () => {
        try {
            const { data } = await axios.get(`${PostUrl}`);
            return data;
        } catch (error) {
            console.log("[getPosts] => "+error);
            return false;
        }
    };

    //-----------------------------------------
    const getPost = async (id: number) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${PostUrl}/${id}`);
            setLoadAnimation(dispatch, false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoadAnimation(dispatch, false);
        }
    };
    const addPost = async (Post: PostType) => {
        try {
            const { data } = await axios.post(`${PostUrl}`, Post);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "Your Recent Post was Posted successfully !"
                });
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: false,
                    message: "Something went wrong, please try again !"
                });
        }
    };
    const updatePost = async (id: number, Post: PostType) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.put(`${PostUrl}`, Post);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "You have got the Post successfully !"
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
                    message: "You have got the Post successfully !"
                });
            return false;
        }
    };
    const deletePost = async (id: number) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${PostUrl}`);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "You have got the Post successfully !"
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
                    message: "You have got the Post successfully !"
                });
            return false;
        }
    };

    return (
        <PostContext.Provider
            value={{
                getPostsByUserId,
                getPosts,
                getPost,
                addPost,
                updatePost,
                deletePost,
            }}>
            {children}
        </PostContext.Provider>
    );
};
