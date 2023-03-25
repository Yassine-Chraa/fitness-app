import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { getUrl } from '../../Helpers/APIConfig';
import Product from '../../types/Product';

export type ProductContextType = {
  products: Array<Product>;
  getProducts: () => Promise<void>;
  getProduct: (id: number) => Promise<Product>;
  addProduct: (product: Product) => Promise<{ message: string }>;
  updateProduct: (id: number, product: Product) => Promise<{ message: string }>;
  deleteProduct: (id: number) => Promise<{ message: string }>;
  searchProduct: (keyword: string) => Promise<void>;
  changeCategory: (id: number) => Promise<void>;
};
const productContext = createContext<ProductContextType | null>(null);

export const useProduct = () => {
  const context = useContext(productContext);
  if (!context) throw new Error('Product Provider is missing');
  return context;
};

const productUrl = getUrl('Products');

export const ProductContextProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([])
  const getProducts = async () => {
    try {
      const { data } = await axios.get(productUrl);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getProduct = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${productUrl}/${id}`);
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
      const { data } = await axios.post(`${productUrl}`, product);
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
      const { data } = await axios.put(`${productUrl}/${id}`, product);
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
      const { data } = await axios.get(`${productUrl}/${id}`);
      setLoading(false);
      return data;
    } catch (error) {
      Alert.alert('Something went wrong');
      console.log(error);
      setLoading(false);
    }
  };
  const searchProduct = async (keyword: string) => {
    try {
        const { data } = await axios.get(`${productUrl}?keyword=${keyword}`);
        setProducts(data);
    } catch (e) {
      console.log(e)
    }
  }
  const changeCategory = async (id: number) => {
    try {
      const { data } = await axios.get(`${productUrl}?category_id=${id}`);
      setProducts(data);
  } catch (e) {
    console.log(e)
  }
  }

  return (
    <productContext.Provider
      value={{
        products,
        getProducts,
        getProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        searchProduct,
        changeCategory
      }}>
      {children}
    </productContext.Provider>
  );
};
