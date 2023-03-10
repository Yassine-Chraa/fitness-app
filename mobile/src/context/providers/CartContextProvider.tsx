import axios from '../../Helpers/axiosConfig';
import { createContext, useContext } from 'react';
import { getUrl } from '../../Helpers/APIConfig';

export type CartContextType = {
    getCart: (id: number | undefined) => Promise<Array<object>>;
    addProduct: (product: any) => Promise<string>;
};
const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('Auth Provider is missing !');
    return context;
};

const userUrl = getUrl('Cart');


export const CartContextProvider = ({ children }: any) => {

    const getCart = async (id: number | undefined) => {
        try {
            const { data } = await axios.get(`${userUrl}/${id}`);
            return data;
        } catch (e) {
            console.log(e);
        }
    };
    const addProduct = async (product: { user_id: number, product_id: number }) => {
        try {
            const { data } = await axios.post(userUrl, product);
            console.log(data)
            return data.message;
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <CartContext.Provider
            value={{
                getCart,
                addProduct
            }}>
            {children}
        </CartContext.Provider>
    );
};
