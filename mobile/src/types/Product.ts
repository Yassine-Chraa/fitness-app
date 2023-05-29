export default interface Product {
  id: number;
  name: string;
  category: 'gym_cloths' | 'mass_gainers';
  description: string;
  product_img: string;
  stock: string;
  price: string;
  rating: number;
  reviews: number;
}
