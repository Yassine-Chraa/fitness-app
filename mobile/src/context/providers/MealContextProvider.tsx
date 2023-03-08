import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { getUrl, currentUser } from '../../Helpers/APIConfig';
import Meal from '../../types/Meal';

export type MealContextType = {
    getMeals: () => Promise<Array<Meal>>;
    getMeal: (id: number) => Promise<Meal>;
    addMeal: (Meal: Meal) => Promise<{ message: string }>;
    updateMeal: (id: number, Meal: Meal) => Promise<{ message: string }>;
    deleteMeal: (id: number) => Promise<{ message: string }>;
};
const MealContext = createContext<MealContextType | null>(null);

export const useMeal = () => {
    const context = useContext(MealContext);
    if (!context) throw new Error('Meal Provider is missing');
    return context;
};

const MealUrl = getUrl('Meals');

export const MealContextProvider = ({ children }: any) => {
    const [loading, setLoading] = useState(false);
    const getMeals = async () => {
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };

            const { data } = await axios.get(`${MealUrl}`, config);
            console.log(data)
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    const getMeal = async (id: number) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get(`${MealUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoading(false);
        }
    };
    const addMeal = async (Meal: Meal) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.post(`${MealUrl}`, Meal, config);
            setLoading(false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoading(false);
        }
    };
    const updateMeal = async (id: number, Meal: Meal) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.put(`${MealUrl}`, Meal, config);
            setLoading(false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoading(false);
        }
    };
    const deleteMeal = async (id: number) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get(`${MealUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            Alert.alert('Something went wrong');
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <MealContext.Provider
            value={{
                getMeals,
                getMeal,
                addMeal,
                updateMeal,
                deleteMeal,
            }}>
            {children}
        </MealContext.Provider>
    );
};
