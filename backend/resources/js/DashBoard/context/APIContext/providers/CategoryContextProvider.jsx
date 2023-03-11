import { createContext, useContext, useState } from "react";
import { useMaterialUIController, setLoadingAnimation } from "../../UIContext";
import { getUrl } from "../Helper";

const categoryContext = createContext();

export const useCategory = () => {
    const context = useContext(categoryContext);
    if (!context) throw new Error("Category Provider is missing");
    return context;
};

const CategoryUrl = getUrl("Category");

export const categoryContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [controller, dispatch] = useMaterialUIController();

    const getCategories = async () => {
        try {
            setLoadingAnimation(dispatch, true);

            const { data } = await axios.get(`${CategoryUrl}`);
            setLoadingAnimation(dispatch, false);
            setCategories(data);
        } catch (error) {
            console.log(error);
            setLoadingAnimation(dispatch, false);
        }
    };

    return (
        <categoryContext.Provider
            value={{
                categories,
                getCategories,
            }}
        >
            {children}
        </categoryContext.Provider>
    );
};
