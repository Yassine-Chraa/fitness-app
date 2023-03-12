import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import Product from '../../types/Product';

export type DailyNutritionContextType = {
    dailyNutrition: Array<object>;
    getDailyNutrition: (user_id: number, date: string) => Promise<void>;
    addProduct: (product: any) => Promise<void>;
    deleteProduct: (user_id: number, product_id: number) => Promise<string>;
};
const DailyNutritionContext = createContext<DailyNutritionContextType | null>(null);

export const useDailyNutrition = () => {
    const context = useContext(DailyNutritionContext);
    if (!context) throw new Error('Auth Provider is missing !');
    return context;
};

const DailyNutritionUrl = getUrl('dailyNutrition');

export const DailyNutritionContextProvider = ({ children }: any) => {
    const [dailyNutrition, setDailyNutrition] = useState(Array<any>);

    const getDailyNutrition = async (user_id: number, date: string) => {
        try {
            const { data } = await axios.get(`${DailyNutritionUrl}/${user_id}/${date}`);
            setDailyNutrition(data)
            console.log(data)
        } catch (e) {
            console.log(e);
        }
    };
    const addProduct = async (product: { user_id: number, product_id: number }) => {
        try {
            const { data } = await axios.post(DailyNutritionUrl, product);
            console.log(data)
            setDailyNutrition((prev) => {
                return [...prev, data];
            })
        } catch (e) {
            console.log(e);
        }
    };
    const deleteProduct = async (user_id: number, product_id: number) => {
        try {
            const { data } = await axios.delete(`${DailyNutritionUrl}/${user_id}/${product_id}`);
            setDailyNutrition((prev) => {
                return prev.filter((item: any) => {
                    return item.product_id != product_id
                })
            })

            return data.message;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <DailyNutritionContext.Provider
            value={{
                dailyNutrition,
                getDailyNutrition,
                addProduct,
                deleteProduct
            }}>
            {children}
        </DailyNutritionContext.Provider>
    );
};
