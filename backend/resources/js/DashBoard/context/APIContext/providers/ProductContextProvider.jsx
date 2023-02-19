import { createContext, useContext, useState } from "react";
import { getUrl } from "../Helper";

const productContext = createContext();

export const useProduct = () => {
    const context = useContext(productContext);
    if (!context) throw new Error("Product Provider is missing");
    return context;
};

const ProductUrl = getUrl("Products");

export const ProductContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const getProducts = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get(`${ProductUrl}`);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const getProduct = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${ProductUrl}`, id);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const addProduct = async (Product) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${ProductUrl}`, Product);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const updateProduct = async (id, Product) => {
        try {
            setLoading(true);
            const { data } = await axios.put(`${ProductUrl}`, id, Product);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${ProductUrl}`, id);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <productContext.Provider
            value={{
                getProducts,
                getProduct,
                addProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </productContext.Provider>
    );
};
