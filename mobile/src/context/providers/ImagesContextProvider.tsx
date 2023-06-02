import axios from '../../Helpers/axiosConfig';
import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { getUrl } from '../../Helpers/APIConfig';
import { useUIController, setLoadAnimation, setIsCheckStateOk } from '../UIContext';
import ImageType from '../../types/ImageType';

export type ImagesContextType = {
    images: Array<ImageType>
    getImages: (id: number) => Promise<Array<ImageType>>;
    getCoachImages: (id: number) => Promise<void>;
    getImage: (id: number) => Promise<ImageType>;
    addImage: (Image: ImageType) => Promise<{ message: string }>;
    updateImage: (id: number, Images: ImageType) => Promise<{ message: string }>;
    deleteImage: (id: number) => Promise<{ message: string }>;
};

const ImagesContext = createContext<ImagesContextType | null>(null);

export const useImages = () => {
    const context = useContext(ImagesContext);
    if (!context) throw new Error('Images Provider is missing');
    return context;
};

const ImagesUrl = getUrl('Images');

export const ImagesContextProvider = ({ children }: any) => {
    const [controller, dispatch] = useUIController();
    const [images, setImages] = useState([]);

    //----------------------------------------
    const getImages = async (id: number) => {
        try {
            const { data } = await axios.get(`${ImagesUrl}?id=${id}`);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const getCoachImages = async (id: number) => {
        try {
            const { data } = await axios.get(`${ImagesUrl}?id=${id}`);
            setImages(data)
        } catch (error) {
            console.log(error);
        }
    };

    //-----------------------------------------
    const getImage = async (id: number) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${ImagesUrl}/${id}`);
            setLoadAnimation(dispatch, false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoadAnimation(dispatch, false);
        }
    };
    const addImage = async (Images: ImageType) => {
        try {
            const { data } = await axios.post(`${ImagesUrl}`, Images);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "Your Recent Images was Imagesed successfully !"
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
    const updateImage = async (id: number, Images: ImageType) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.put(`${ImagesUrl}`, Images);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "You have got the Images successfully !"
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
                    message: "You have got the Images successfully !"
                });
            return false;
        }
    };
    const deleteImage = async (id: number) => {
        try {
            setLoadAnimation(dispatch, true);
            const { data } = await axios.get(`${ImagesUrl}`);
            setLoadAnimation(dispatch, false);
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: true,
                    message: "You have got the Images successfully !"
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
                    message: "You have got the Images successfully !"
                });
            return false;
        }
    };

    return (
        <ImagesContext.Provider
            value={{
                images,
                getImages,
                getCoachImages,
                getImage,
                addImage,
                updateImage,
                deleteImage,
            }}>
            {children}
        </ImagesContext.Provider>
    );
};
