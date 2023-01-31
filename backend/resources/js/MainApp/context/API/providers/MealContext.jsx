import { createContext, useContext, useState } from "react";
import { getUrl, currentUser } from "../Helper";

const mealContext = createContext();

export const useMeal = () => {
    const context = useContext(mealContext);
    if (!context) throw new Error("Meal Provider is missing");
    return context;
};

const MealUrl = getUrl("Meals");

export const MealContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const getMeals = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };

            const { data } = await axios.get(`${MealUrl}`, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const getMeal = async (id) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.get(`${MealUrl}`,id, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const addMeal = async (Meal) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.post(`${MealUrl}`, Meal, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const updateMeal = async (id, Meal) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.put(`${MealUrl}`, id, Meal, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const deleteMeal = async (id) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('api_token')}`,
                },
            };
            const { data } = await axios.get(`${MealUrl}`,id, config);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <mealContext.Provider
            value={{
                getMeals,
                getMeal,
                addMeal,
                updateMeal,
                deleteMeal,
            }}
        >
            {children}
        </mealContext.Provider>
    );
};
