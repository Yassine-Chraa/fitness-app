import { ProductContextProvider } from './providers/ProductContextProvider';
import { Composer } from '../Helpers/Composer';
import { AuthContextProvider } from './providers/AuthContextProvider';
import { CartContextProvider } from './providers/CartContextProvider';
import { CategoryContextProvider } from './providers/CategoryConextProvider';
import { DailyNutritionContextProvider } from './providers/DailyNutritionProvider';
import { CoachContextProvider } from './providers/CoachesContextProvider'
import { ExerciseContextProvider } from './providers/ExerciseContextProvider';
import { ProgramContextProvider } from './providers/ProgramContextProvider';
import { feedBackContextProvider } from './providers/FeedBackContextProvider';
import { PostContextProvider } from './providers/PostContextProvider';
import { CommentContextProvider } from './providers/CommentContextProvider';
import { ReplyContextProvider } from './providers/ReplyContextProvider';
import { UpLoadImageContextProvider } from './providers/UpLoadImageContextProvider';

import { WorkoutContextProvider } from './providers/WorkoutContextProvider';
import { ReactionContextProvider } from './providers/ReactionContextProvider';
const providers: any = [
  ProductContextProvider,
  AuthContextProvider,
  CartContextProvider,
  CategoryContextProvider,
  DailyNutritionContextProvider,
  CoachContextProvider,
  ProgramContextProvider,
  ExerciseContextProvider,
  feedBackContextProvider,
  PostContextProvider,
  CommentContextProvider,
  ReplyContextProvider,
  UpLoadImageContextProvider,
  ReactionContextProvider,
  WorkoutContextProvider
];

const APIHandlerProvider = Composer(...providers);

export default APIHandlerProvider;
