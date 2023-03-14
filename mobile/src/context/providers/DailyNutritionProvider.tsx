import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import Food from '../../types/Food';

export type DailyNutritionContextType = {
    dailyNutrition: Object<any>;
    forceUpdate: boolean;
    getDailyNutrition: (user_id: number, date: string) => Promise<void>;
    addFood: (food: Food) => Promise<string>;
    deleteFood: (daily_nutrition_id: number, food_id: number) => Promise<string>;
};
const DailyNutritionContext = createContext<DailyNutritionContextType | null>(null);

export const useDailyNutrition = () => {
    const context = useContext(DailyNutritionContext);
    if (!context) throw new Error('Daily Nutrition Provider is missing !');
    return context;
};

const DailyNutritionUrl = getUrl('DailyNutrition');

export const DailyNutritionContextProvider = ({ children }: any) => {
    const [dailyNutrition, setDailyNutrition] = useState(Object<any>);
    const [forceUpdate, setForceUpdate] = useState(false);

    const getDailyNutrition = async (user_id: number, date: string) => {
        try {
            const { data } = await axios.get(`${DailyNutritionUrl}/${user_id}/${date}`);
            setDailyNutrition(data)
        } catch (e) {
            console.log(e);
        }
    };
    const addFood = async (food: Food) => {
        try {
            const { data } = await axios.post(`${DailyNutritionUrl}/item`, food);
            return data.message;
        } catch (e) {
            console.log(e);
        }
    };
    const deleteFood = async (daily_nutrition_id: number, food_id: number) => {
        try {
            const { data } = await axios.delete(`${DailyNutritionUrl}/item/${daily_nutrition_id}/${food_id}`);

            setDailyNutrition((prev: any) => {
                const temp = prev;

                temp.history_items = temp.history_items.filter((item: any) => {
                    return item.id != food_id;
                });
                console.log(temp.history_items.length)
                return temp;
            })
            setForceUpdate(prev=>!prev);

            return data.message;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <DailyNutritionContext.Provider
            value={{
                dailyNutrition,
                forceUpdate,
                getDailyNutrition,
                addFood,
                deleteFood
            }}>
            {children}
        </DailyNutritionContext.Provider>
    );
};
