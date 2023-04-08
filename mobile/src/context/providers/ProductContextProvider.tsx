import axios from '../../Helpers/axiosConfig';
import { createContext, useContext, useState } from 'react';
import { getUrl } from '../../Helpers/APIConfig';
import Product from '../../types/Product';
import getData from '../../Helpers/Storage/getData';
import UserInfo from '../../types/UserInfo';
import storeData from '../../Helpers/Storage/storeData';

export type ProductContextType = {
  products: Array<Product>;
  getProducts: () => Promise<void>;
  addReview: (review: { user_id: number | undefined, product_id: number | undefined, rating: number }) => Promise<{ rating: number }>;
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
  const addReview = async (review: { user_id: number | undefined, product_id: number | undefined, rating: number }) => {
    try {
      const { user_id, product_id, rating } = review;
      const { data } = await axios.post(`${productUrl}/rating`, review);
      console.log(data);
      getProducts();
      const current_user: UserInfo = await getData('current_user');
      const i = current_user.ratings.findIndex(item => item.product_id == review.product_id);

      if (i >= 0) current_user.ratings[i].rating = review.rating;
      else {
        if(user_id && product_id){
          current_user.ratings.push({ user_id, product_id, rating })
        }
      }
      await storeData('current_user', current_user);
      return data;
    } catch (e) {
      console.log(e)
    }
  }
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
        addReview,
        searchProduct,
        changeCategory
      }}>
      {children}
    </productContext.Provider>
  );
};
