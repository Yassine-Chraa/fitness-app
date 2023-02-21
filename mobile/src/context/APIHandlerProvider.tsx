import {ProductContextProvider} from './providers/ProductContextProvider';
import {Composer} from '../Helpers/Composer';
import {AuthContextProvider} from './providers/AuthContextProvider';
import {MealContextProvider} from './providers/MealContextProvider';
import {EquipmentContextProvider} from './providers/EquipmentContextProvider';

const providers: any = [
  ProductContextProvider,
  AuthContextProvider,
  MealContextProvider,
  EquipmentContextProvider,
  ProductContextProvider,
];

const APIHandlerProvider = Composer(...providers);

export default APIHandlerProvider;
