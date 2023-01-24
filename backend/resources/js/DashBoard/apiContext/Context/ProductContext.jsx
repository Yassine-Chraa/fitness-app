import { createContext, useContext, useState } from "react";
import { getUrl } from "../API/Helper";

const productContext = createContext();

export const useProduct = () => {
    const context = useContext(productContext);
    if (!context) throw new Error("Product Provider is missing");
    return context;
};

const ProductUrl = getUrl("Products");

//-------------
const currentUser = {
    id: 1,
    role: "admin",
    name: "Yassine Chraa",
    email: "yassinechraa@gmail.com",
    email_verified_at: null,
    profile: null,
    created_at: "",
    updated_at: "",
    token: "1|3pkkXlSGZA8Kh7qbuVruzoFbPKbeiJvKepE8Ey3U",
};
//-------------

export const ProductContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const getProducts = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };

            const { data } = await axios.get(`${ProductUrl}`, config);
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
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get(`${ProductUrl}`, id, config);
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
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.post(`${ProductUrl}`, Product, config);
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
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.put(`${ProductUrl}`, id, Product, config);
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
            const config = {
                headers: {
                    authorization: `Bearer ${currentUser.token}`,
                },
            };
            const { data } = await axios.get(`${ProductUrl}`, id, config);
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
