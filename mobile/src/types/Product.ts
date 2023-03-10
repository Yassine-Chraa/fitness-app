export default interface Product {
  id: number;
  name: string;
  category: 'gym_cloths' | 'mass_gainers';
  description: string;
  image: string;
  stock: string;
  price: string;
  rating: number;
  reviews: number;
}
