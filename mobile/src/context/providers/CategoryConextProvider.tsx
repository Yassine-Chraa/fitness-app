import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';

export type CategoryContextType = {
    getCategories: () => Promise<void>;
    categories: Array<{id:number,parent:string,name: string}>
};
const CategoryContext = createContext<CategoryContextType | null>(null);

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) throw new Error('Categories Provider is missing !');
    return context;
};

const categoryUrl = getUrl('Categories');


export const CategoryContextProvider = ({ children }: any) => {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const { data } = await axios.get(categoryUrl);
            setCategories(data)
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <CategoryContext.Provider
            value={{
                getCategories,
                categories
            }}>
            {children}
        </CategoryContext.Provider>
    );
};
