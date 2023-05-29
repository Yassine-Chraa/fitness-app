import axios from '../../Helpers/axiosConfig';
import React, { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import Toast from 'react-native-toast-message';
export type CartContextType = {
    cart: Array<object>;
    getCart: (id: number | undefined) => Promise<void>;
    addProduct: (product: any) => Promise<void>;
    deleteProduct: (user_id: number, product_id: number) => Promise<string>;
};
const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('Auth Provider is missing !');
    return context;
};

const cartUrl = getUrl('Cart');


export const CartContextProvider = ({ children }: any) => {
    const [cart, setCart] = useState(Array<any>);

    const getCart = async (id: number | undefined) => {
        try {
            const { data } = await axios.get(`${cartUrl}/${id}`);
            setCart(data)
        } catch (e) {
            console.log(e);
        }
    };
    const addProduct = async (product: { user_id: number, product_id: number }) => {
        try {
            const { data } = await axios.post(cartUrl, product);
            console.log(data)
            setCart((prev) => {
                return [...prev, data];
            })
            Toast.show({
                type: 'success',
                text1: 'Product added to your cart',
            })
        } catch (e) {
            console.log(e);
        }
    };
    const deleteProduct = async (user_id: number, product_id: number) => {
        try {
            const { data } = await axios.delete(`${cartUrl}/${user_id}/${product_id}`);
            setCart((prev) => {
                return prev.filter((item: any) => {
                    return item.product_id != product_id
                })
            })
            Toast.show({
                type: 'success',
                text1: 'Product deleted from your cart',
            })

            return data.message;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                getCart,
                addProduct,
                deleteProduct
            }}>
            {children}
        </CartContext.Provider>
    );
};
