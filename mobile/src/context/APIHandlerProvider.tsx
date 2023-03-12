import { ProductContextProvider } from './providers/ProductContextProvider';
import { Composer } from '../Helpers/Composer';
import { AuthContextProvider } from './providers/AuthContextProvider';
import { CartContextProvider } from './providers/CartContextProvider';
import { CategoryContextProvider } from './providers/CategoryConextProvider';
import { DailyNutritionContextProvider } from './providers/DailyNutritionProvider';

const providers: any = [
  ProductContextProvider,
  AuthContextProvider,
  ProductContextProvider,
  CartContextProvider,
  CategoryContextProvider,
  DailyNutritionContextProvider
];

const APIHandlerProvider = Composer(...providers);

export default APIHandlerProvider;
