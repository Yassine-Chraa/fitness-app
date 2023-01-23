import axios from 'axios';
import {createContext, useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {getUrl} from '../API';
import {Product} from '../types/Product';
import {User} from '../types/User';

export type ProductContextType = {
  getProducts: () => Promise<Array<Product>>;
  getProduct: (id: number) => Promise<Product>;
  addProduct: (product: Product) => Promise<{message: string}>;
  updateProduct: (id: number, product: Product) => Promise<{message: string}>;
  deleteProduct: (id: number) => Promise<{message: string}>;
};
const productContext = createContext<ProductContextType | null>(null);

export const useProduct = () => {
  const context = useContext(productContext);
  if (!context) throw new Error('Product Provider is missing');
  return context;
};

const productUrl = getUrl('Products');
const currentUser: User = {
  id: 1,
  role: 'admin',
  name: 'Yassine Chraa',
  email: 'yassinechraa@gmail.com',
  email_verified_at: null,
  profile: null,
  created_at: '',
  updated_at: '',
  token: '1|3pkkXlSGZA8Kh7qbuVruzoFbPKbeiJvKepE8Ey3U',
};
export const ProductContextProvider = ({children}: any) => {
  const [loading, setLoading] = useState(false);
  const getProducts = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      };

      const {data} = await axios.get(`${productUrl}`, config);
      return data;
    } catch (error) {
      Alert.alert('Something went wrong');
      console.log(error);
    }
  };
  const getProduct = async (id: number) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      };
      const {data} = await axios.get(`${productUrl}`, config);
      setLoading(false);
      return data;
    } catch (error) {
      Alert.alert('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };
  const addProduct = async (product: Product) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      };
      const {data} = await axios.post(`${productUrl}`, product, config);
      setLoading(false);
      return data;
    } catch (error) {
      Alert.alert('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };
  const updateProduct = async (id: number, product: Product) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      };
      const {data} = await axios.put(`${productUrl}`, product, config);
      setLoading(false);
      return data;
    } catch (error) {
      Alert.alert('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };
  const deleteProduct = async (id: number) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          authorization: `Bearer ${currentUser.token}`,
        },
      };
      const {data} = await axios.get(`${productUrl}`, config);
      setLoading(false);
      return data;
    } catch (error) {
      Alert.alert('Something went wrong');
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
      }}>
      {children}
    </productContext.Provider>
  );
};
