import { createContext, useContext, useState } from "react";
import { getUrl } from "../Helper";
import { setLoadingAnimation, setMessageObject, useMaterialUIController } from "../../UIContext";

const productContext = createContext();

export const useProduct = () => {
    const context = useContext(productContext);
    if (!context) throw new Error("Product Provider is missing");
    return context;
};

const ProductUrl = getUrl("Products");
const uploadUrl = getUrl("Upload");

export const ProductContextProvider = ({ children }) => {
    const [controller, dispatch] = useMaterialUIController();
    const [products, setProducts] = useState([]);
    const getProducts = async () => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${ProductUrl}`);
            setProducts(data);
            setLoadingAnimation(dispatch, false);
        } catch (error) {
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "error",
                message: "Something Went wrong !",
                state: "mount",
            });
        }
    };
    const getProduct = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.get(`${ProductUrl}/${id}`);
            setLoadingAnimation(dispatch, false);
            return data;
        } catch (error) {
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "error",
                message: "Something Went wrong !",
                state: "mount",
            });
        }
    };
    const addProduct = async (Product, imageFile) => {
        try {
            let res;
            setLoadingAnimation(dispatch, true);
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
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "success",
                message: "Product stored successfully",
                state: "mount",
            });
            return res.data.message;
        } catch (error) {
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "error",
                message: "Something Went wrong !",
                state: "mount",
            });
        }
    };
    const updateProduct = async (id, Product, imageFile) => {
        try {
            let res;
            setLoadingAnimation(dispatch, true);
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
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "success",
                message: "Product updated successfully",
                state: "mount",
            });
            return res.data.message;
        } catch (error) {
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "error",
                message: "Something Went wrong !",
                state: "mount",
            });
        }
    };
    const deleteProduct = async (id) => {
        try {
            setLoadingAnimation(dispatch, true);
            const { data } = await axios.delete(`${ProductUrl}/${id}`);
            getProducts();
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "success",
                message: "User deleted successfully",
                state: "mount",
            });
            return data;
        } catch (error) {
            setLoadingAnimation(dispatch, false);
            setMessageObject(dispatch, {
                type: "error",
                message: "Something Went wrong !",
                state: "mount",
            });
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
