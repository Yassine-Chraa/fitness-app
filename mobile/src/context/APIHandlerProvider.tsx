import { ProductContextProvider } from './providers/ProductContextProvider';
import { Composer } from '../Helpers/Composer';
import { AuthContextProvider } from './providers/AuthContextProvider';
import { CartContextProvider } from './providers/CartContextProvider';
import { CategoryContextProvider } from './providers/CategoryConextProvider';

const providers: any = [
  ProductContextProvider,
  AuthContextProvider,
  ProductContextProvider,
  CartContextProvider,
  CategoryContextProvider
];

const APIHandlerProvider = Composer(...providers);

export default APIHandlerProvider;
