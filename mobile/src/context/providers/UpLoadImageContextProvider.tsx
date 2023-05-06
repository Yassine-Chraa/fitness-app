import axios from '../../Helpers/axiosConfig';
import React, { createContext, useContext } from 'react';
import { useUIController, setLoadAnimation, setIsCheckStateOk } from '../UIContext';
import { getUrl } from '../../Helpers/APIConfig';

export type UpLoadImageContextType = {
    uploadImage: (image: any) => Promise<string|boolean>;
};

const UpLoadImageContext = createContext<UpLoadImageContextType | null>(null);

export const useUpLoadImage = () => {
    const context = useContext(UpLoadImageContext);
    if (!context) throw new Error('Upload Provider is missing');
    return context;
};

const UploadUrl = getUrl('UploadUrl');

export const UpLoadImageContextProvider = ({ children }: any) => {
    const [controller, dispatch] = useUIController();


    const generateRandomName = () => {
        const timestamp = Date.now().toString();
        const randomString = Math.random().toString(36).substring(2, 8);
        return `${timestamp}_${randomString}`;
    }


    const uploadImage = async (image: any) => {
        const { uri, type } = image;
        const formData = new FormData();
        const extension = uri.split('.').pop();
        formData.append('imageFile', {
            uri: uri,
            name: `${generateRandomName()}.${extension}`,
            type: `image/${extension}`,
        });
        let response = false;
        await axios.post(UploadUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(data => {
            response = data.data.img_url
        }).catch(err => {
            setIsCheckStateOk(dispatch,
                {
                    isCheck: true,
                    isSuccess: false,
                    message: "Oooops, Something went wrong !!!"
                });
            response = false
        })


        return response
    };



    return (
        <UpLoadImageContext.Provider
            value={{
                uploadImage,
            }}>
            {children}
        </UpLoadImageContext.Provider>
    );
};
