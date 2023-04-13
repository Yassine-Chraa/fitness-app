import { ProductContextProvider } from './providers/ProductContextProvider';
import { Composer } from '../Helpers/Composer';
import { AuthContextProvider } from './providers/AuthContextProvider';
import { CartContextProvider } from './providers/CartContextProvider';
import { CategoryContextProvider } from './providers/CategoryConextProvider';
import { DailyNutritionContextProvider } from './providers/DailyNutritionProvider';
import { CoachContextProvider } from './providers/CoachesContextProvider'
import { ExerciseContextProvider } from './providers/ExerciseContextProvider';
import { ProgramContextProvider } from './providers/ProgramContextProvider';
const providers: any = [
  ProductContextProvider,
  AuthContextProvider,
  CartContextProvider,
  CategoryContextProvider,
  DailyNutritionContextProvider,
  CoachContextProvider,
  ProgramContextProvider,
  ExerciseContextProvider
];

const APIHandlerProvider = Composer(...providers);

export default APIHandlerProvider;
