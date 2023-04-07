import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import Food from '../../types/Food';
import DailyNutrition from '../../types/DailyNutrition'

export type DailyNutritionContextType = {
    lastNuritions: Array<DailyNutrition>;
    dailyNutrition: DailyNutrition;
    forceUpdate: boolean;
    getDailyNutrition: (user_id: number, date: string) => Promise<void>;
    getLastNutritions: (user_id:number) => Promise<void>;
    addFood: (user_id:number,date:string,food: Food) => Promise<string>;
    updateFood: (daily_nutrition_id:number,food_id:string,poid:number)=>Promise<string>
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
    const [dailyNutrition, setDailyNutrition] = useState(Object);
    const [lastNuritions, setLastNuritions] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);

    const getLastNutritions = async (user_id: number) => {
        try {
            const { data } = await axios.get(`${DailyNutritionUrl}/${user_id}`);
            setLastNuritions(data)
            setForceUpdate(prev => !prev);
        } catch (e) {
            console.log(e);
        }
    };
    const getDailyNutrition = async (user_id: number, date: string) => {
        try {
            const { data } = await axios.get(`${DailyNutritionUrl}/${user_id}/${date}`);
            setDailyNutrition(data)
        } catch (e) {
            console.log(e);
        }
    };
    const addFood = async (user_id:number,date:string,food: Food) => {
        try {
            const { data } = await axios.post(`${DailyNutritionUrl}/item/${user_id}/${date}`, food);
            return data.message;
        } catch (e) {
            console.log(e);
        }
    };
    const updateFood = async (daily_nutrition_id:number,food_id:string,poid:number) => {
        try {
            const { data } = await axios.put(`${DailyNutritionUrl}/item/${daily_nutrition_id}/${food_id}`, {poid});
            setForceUpdate(prev => !prev);
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
                return temp;
            })
            setForceUpdate(prev => !prev);

            return data.message;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <DailyNutritionContext.Provider
            value={{
                lastNuritions,
                dailyNutrition,
                forceUpdate,
                getLastNutritions,
                getDailyNutrition,
                addFood,
                updateFood,
                deleteFood
            }}>
            {children}
        </DailyNutritionContext.Provider>
    );
};
