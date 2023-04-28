import { ProductContextProvider } from './providers/ProductContextProvider';
import { Composer } from '../Helpers/Composer';
import { AuthContextProvider } from './providers/AuthContextProvider';
import { CartContextProvider } from './providers/CartContextProvider';
import { CategoryContextProvider } from './providers/CategoryConextProvider';
import { DailyNutritionContextProvider } from './providers/DailyNutritionProvider';
import { CoachContextProvider} from './providers/CoachesContextProvider'
import { feedBackContextProvider } from './providers/FeedBackContextProvider';
const providers: any = [
  ProductContextProvider,
  AuthContextProvider,
  ProductContextProvider,
  CartContextProvider,
  CategoryContextProvider,
  DailyNutritionContextProvider,
  CoachContextProvider,
  feedBackContextProvider,
];

const APIHandlerProvider = Composer(...providers);

export default APIHandlerProvider;
