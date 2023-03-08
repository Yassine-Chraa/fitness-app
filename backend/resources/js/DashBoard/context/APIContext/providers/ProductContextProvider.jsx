import { createContext, useContext, useState } from "react";
import { getUrl } from "../Helper";

const productContext = createContext();

export const useProduct = () => {
    const context = useContext(productContext);
    if (!context) throw new Error("Product Provider is missing");
    return context;
};

const ProductUrl = getUrl("Products");
const uploadUrl = getUrl("Upload");

export const ProductContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            setLoading(true);

            const { data } = await axios.get(`${ProductUrl}`);
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const getProduct = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${ProductUrl}/${id}`);
            setLoading(false);
            return data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const addProduct = async (Product, imageFile) => {
        try {
            let res;
            setLoading(true);
            if (imageFile) {
                const formData = new FormData();
                formData.append("imageFile", imageFile);
                const { data } = await axios.post(uploadUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                res = await axios.post(`${ProductUrl}`, {
                    ...Product,
                    product_img: data.img_url,
                });
            } else {
                res = await axios.post(`${ProductUrl}`, Product);
            }
            getProducts();
            setLoading(false);
            return res.data.message;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const updateProduct = async (id, Product, imageFile) => {
        try {
            let res;
            setLoading(true);
            if (imageFile) {
                const formData = new FormData();
                formData.append("imageFile", imageFile);
                const { data } = await axios.post(uploadUrl, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                res = await axios.put(`${ProductUrl}/${id}`, {
                    ...Product,
                    product_img: data.img_url,
                });
            } else {
                res = await axios.put(`${ProductUrl}/${id}`, Product);
            }
            getProducts();
            setLoading(false);
            return res.data.message;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            const { data } = await axios.delete(`${ProductUrl}/${id}`);
            getProducts();
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
                products,
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
